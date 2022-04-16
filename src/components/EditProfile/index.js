import { useState, useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditRounded";
import { useUserSlice, useUtilsSlice } from "@redux/getSlices";
import { useForm } from "@utils/hooks.js";
import { UPDATE_USER } from "@utils/graphql";
import { useMutation } from "@apollo/react-hooks";
import MsgBox from "@components/MessageBox";
import imageCompression from "browser-image-compression";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import profilePlaceholder from "@assets/profile.png";

import "./EditProfile.css";
var picture = "";

function EditProfile({ app }) {
  const [{ user, imgCrop }, dispatch] = useUserSlice();
  const [profile, setProfile] = useState(user?.picture);
  const [loading, setLoading] = useState({ isLoading: false, message: "" });
  const [{ popup }, dispatchUtils] = useUtilsSlice();
  const [editPassword, setEditPassword] = useState(false);
  const [message, setMessage] = useState("");
  const firebaseStorage = getStorage(app);
  const fileInputRef = useRef(null);

  const { onChange, onSubmit, values, updateValues } = useForm(updateUser, {
    ...user,
    password: user?.secure ? "secure" : "",
    newPassword: "",
    confirmNewPassword: "",
  });

  if (picture === "" && values.picture !== "") picture = values.picture;

  const [updateProfile] = useMutation(UPDATE_USER, {
    variables: { ...values, picture },
    update(_, { data }) {
      setLoading({ isLoading: false, message: "" });
      // setActive(false);
      // console.logg(data);
      if (data) {
        dispatch({
          type: "SET_USER",
          payload: { ...data.updateUser, secure: false },
        });
      }

      if (imgCrop.croppedImgUrl) {
        setLoading({ isLoading: false, message: "" });
        dispatch({
          type: "SET_CROP_IMG",
          payload: {
            imgSrc: "",
            croppedImgUrl: null,
            aspect: null,
          },
        });
      }

      dispatchUtils({
        type: "DELETE_BOOK",
        payload: {
          title: "Details Updated",
          subtitle: "Your details were updated successfully.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });
    },
    onError(err) {
      console.log("An error occured while changing data");
      setLoading({ isLoading: false, message: "" });
    },
  });

  function updateUser() {
    setLoading({
      isLoading: true,
      message: "We're are updating your information",
    });

    updateProfile({
      variables: {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        picture: picture,
        university: values.university,
        degree: values.degree,
        campus: values.campus,
        gender: values.gender,
      },
    });
  }

  const saveChanges = (e) => {
    if (
      values.password !== "" ||
      values.newPassword !== "" ||
      values.confirmNewPassword !== ""
    ) {
      let isPass = values.password !== "";
      let isNewPass =
        values.newPassword !== "" &&
        values.newPassword === values.confirmNewPassword;

      if (!(isPass && isNewPass)) {
        console.log(isPass, isNewPass);
        setMessage(
          "To change password, please provide current password and confirm new password must match new password."
        );

        document
          .querySelector(".app > .editProfile__overlay > .editProfile")
          .classList.toggle("save_discard_changes");

        return;
      }
    }

    onSubmit(e);
  };

  const removeProfileImage = async () => {
    if (user.picture === "") return;

    let userProfile = `${user.id}/profile/${user.firstName}.webp`;
    if (userProfile.includes("jpg")) userProfile.replace("webp", "jpg");

    let imageRef = ref(firebaseStorage, userProfile);

    await deleteObject(imageRef)
      .then(() => {
        updateProfile({ variables: { picture: "" } });
      })
      .catch((err) => console.log("Error encountered"));
  };

  const saveImageToCloud = async (e) => {
    if (profile !== values.picture) {
      setLoading({
        isLoading: true,
        message: "Saving image to cloud",
      });

      const storageRef = ref(
        firebaseStorage,
        `${user.id}/profile/${user.firstName}.png`
      );

      let options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      };

      const file = await imageCompression.getFilefromDataUrl(
        profile,
        user.firstName + ".png"
      );

      let newFile = await imageCompression(file, options);

      await uploadBytes(storageRef, newFile)
        .then(() => {
          console.log("Image has been uploaded");
          dispatch({
            type: "SET_CROP_IMG",
            payload: {
              imgSrc: "",
              croppedImgUrl: null,
              aspect: null,
            },
          });
        })
        .catch((err) => {
          console.log("Error uploading image: ");
        });

      await getDownloadURL(storageRef)
        .then((url) => {
          if (url) {
            setProfile(url);
          } else setProfile("");
        })
        .catch((err) => console.log(""));
    }

    saveChanges(e);
  };

  const removeImageClicked = () =>
    dispatchUtils({
      type: "DELETE_BOOK",
      payload: {
        title: "Remove Profile Image?",
        subtitle: "Are you sure you want to remove the profile image?",
        btnCancel: true,
        btnContinue: true,
        bookTitle: "",
        popupShow: false,
      },
    });

  const handleEditProfileCancel = (e) => {
    e.preventDefault();

    let { password, newPassword, confirmNewPassword, ...data } = values;

    if (
      JSON.stringify(user) !== JSON.stringify(data) ||
      profile !== values.picture
    ) {
      // Do stuff here man
      document
        .querySelector(".app > .editProfile__overlay > .editProfile")
        .classList.toggle("save_discard_changes");

      return;
    }

    dispatch({
      type: "SET_EDIT_PROFILE",
      payload: { edit: false },
    });
  };

  const keepEditingClicked = (e) => {
    e.preventDefault();

    document
      .querySelector(".app > .editProfile__overlay > .editProfile")
      .classList.toggle("save_discard_changes");
  };

  const closeAndDiscardClicked = (e) => {
    e.preventDefault();

    document
      .querySelector(".app > .editProfile__overlay > .editProfile")
      .classList.toggle("save_discard_changes");

    dispatch({
      type: "SET_EDIT_PROFILE",
      payload: { edit: false },
    });

    updateValues(user);
    picture = user.picture;
  };

  const handleFileInput = async (inputEvent) => {
    const [file] = inputEvent.target.files;
    if (file) {
      let newFile = await imageCompression(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 1024,
        useWebWorker: true,
      });

      const reader = new FileReader();

      reader.onload = (readerEvent) => {
        dispatch({
          type: "SET_CROP_IMG",
          payload: {
            ...imgCrop,
            imgSrc: readerEvent.target.result,
          },
        });
      };

      window.scrollTo(0, 0);
      reader.readAsDataURL(newFile);
    }

    fileInputRef.current.value = "";
  };

  useEffect(() => {
    if (!imgCrop.croppedImgUrl) return;
    setProfile(imgCrop.croppedImgUrl);

    return () => {
      dispatch({
        type: "SET_CROP_IMG",
        payload: {
          imgSrc: "",
          croppedImgUrl: null,
          aspect: null,
        },
      });
    };
  }, [imgCrop, setProfile, dispatch]);

  return (
    <div className="editProfile__overlay">
      {popup.title === "Remove Profile Image?" && (
        <MsgBox oncontinue={removeProfileImage} />
      )}
      <section className="editProfile">
        {loading.isLoading && (
          <div className="editProfile__loading">
            <span>{loading.message}</span>
          </div>
        )}
        <header className="editProfile__header">
          <h2>Edit Profile</h2>
          <span
            role="button"
            onClick={handleEditProfileCancel}
            className="icon-container"
          >
            <CloseIcon />
          </span>
        </header>

        <main className="editProfile__main">
          <div className="editProfile__mainImage">
            <span>Profile Image</span>
            <div className="image-container">
              <img
                src={profile || profilePlaceholder}
                alt="edit your profile"
              />
              <input
                type="file"
                onChange={handleFileInput}
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
            <button onClick={() => fileInputRef.current.click()}>
              Upload Image
            </button>

            {/* If user image exists the we remove it and show the person default */}
            {values.picture !== "" && (
              <button
                className="removeImageBtn"
                onClick={() => removeImageClicked()}
              >
                Remove Image
              </button>
            )}
          </div>

          <form autoComplete="off" className="editProfile__mainForm">
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                className="editProfile__mainFormInput"
                name="firstName"
                value={values?.firstName}
                onChange={onChange}
                type="text"
                id="firstName"
              />
            </div>

            <div>
              <label htmlFor="lastName">Last name</label>
              <input
                className="editProfile__mainFormInput"
                name="lastName"
                type="text"
                id="lastName"
                value={values?.lastName}
                onChange={onChange}
              />
            </div>

            <div>
              <label htmlFor="degree">Gender</label>
              <div className="newUser__mainFormRadio">
                <span>
                  <input
                    name="gender"
                    type="radio"
                    id="male"
                    value="Male"
                    onChange={onChange}
                    checked={values?.gender === "Male" && "checked"}
                  />
                  <label htmlFor="male">Male</label>
                </span>

                <span>
                  <input
                    name="gender"
                    type="radio"
                    id="female"
                    value="Female"
                    onChange={onChange}
                    checked={values?.gender === "Female" ? "checked" : ""}
                  />
                  <label htmlFor="female">Female</label>
                </span>

                <span>
                  <input
                    name="gender"
                    type="radio"
                    id="notSay"
                    value="Rather not say"
                    onChange={onChange}
                    checked={
                      values?.gender === "Rather not say" ? "checked" : ""
                    }
                  />
                  <label htmlFor="notSay">I'd rather not say</label>
                </span>
              </div>
              <p>You can choose to not specify your gender.</p>
            </div>

            <div>
              <label htmlFor="email">Email address</label>
              <input
                className="editProfile__mainFormInput"
                name="email"
                type="text"
                id="email"
                value={values?.email}
                onChange={onChange}
                disabled
              />
              <p>Anyone on Qampus can see your email and cannot be changed.</p>
            </div>

            <div>
              <label htmlFor="university">Institution</label>
              <input
                className="editProfile__mainFormInput"
                name="university"
                type="text"
                id="university"
                value={values?.university}
                onChange={onChange}
              />
              <p>Help us show you things relavant to your school</p>
            </div>

            <div>
              <label htmlFor="campus">Campus</label>
              <input
                className="editProfile__mainFormInput"
                name="campus"
                type="text"
                id="campus"
                value={values?.campus}
                onChange={onChange}
              />
              <p>Which campus of your school are you on</p>
            </div>

            <div>
              <label htmlFor="degree">Qualification</label>
              <input
                className="editProfile__mainFormInput"
                name="degree"
                type="text"
                id="degree"
                value={values?.degree}
                onChange={onChange}
              />
              <p>
                Let others on Qampus know what you're studying. You might get a
                study partner
              </p>
            </div>

            <div>
              {editPassword ? (
                <hr />
              ) : (
                <button
                  className="profile__edit"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditPassword(true);
                  }}
                >
                  <EditOutlinedIcon /> Change Password
                </button>
              )}
            </div>

            {editPassword && (
              <section className="editProfile__changePasswords">
                {user?.secure === false && (
                  <div>
                    <label htmlFor="password">Current Password</label>
                    <input
                      className="editProfile__mainFormInput"
                      name="password"
                      type="password"
                      id="password"
                      value={values?.password}
                      onChange={onChange}
                    />
                    <p>
                      Verify it's you requsting a password change by entering
                      current password.
                    </p>
                  </div>
                )}

                <div>
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    className="editProfile__mainFormInput"
                    name="newPassword"
                    type="password"
                    id="newPassword"
                    value={values?.newPassword}
                    onChange={onChange}
                  />
                  <p>
                    Make sure your password is strong, you can remember it and
                    no one can guess it
                  </p>
                </div>

                <div>
                  <label htmlFor="confirmNewPassword">
                    Confirm New Password
                  </label>
                  <input
                    className="editProfile__mainFormInput"
                    name="confirmNewPassword"
                    type="password"
                    id="confirmNewPassword"
                    value={values?.confirmNewPassword}
                    onChange={onChange}
                  />
                  <p>This must match your new password</p>
                </div>
              </section>
            )}
          </form>
        </main>

        <footer className="editProfile__footer">
          <div>
            <button onClick={handleEditProfileCancel}>Cancel</button>
            <button onClick={saveImageToCloud}>Save Changes</button>
          </div>
        </footer>

        <div className="editProfile__saveChanges">
          <p>
            {message ||
              "You have unsaved changes, closing this window will discard them."}
          </p>
          <div>
            <button onClick={keepEditingClicked}>Keep Editing</button>
            <button onClick={closeAndDiscardClicked}>
              Close &amp; Discard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditProfile;
