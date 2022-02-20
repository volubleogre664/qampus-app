import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useUserSlice } from "@redux/getSlices";
import { useForm } from "@utils/hooks.js";
import { UPDATE_USER } from "@utils/graphql";
import { useMutation } from "@apollo/react-hooks";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";
import profilePlaceholder from "@assets/profile.png";

import "./EditProfile.css";

function EditProfile({ app }) {
  const [{ user, imgCrop }, dispatch] = useUserSlice();
  const firebaseStorage = getStorage(app);
  const [profile, setProfile] = useState(null);

  const { onChange, onSubmit, values, updateValues } = useForm(updateUser, {
    user,
  });

  const [updateProfile] = useMutation(
    UPDATE_USER,
    { ...user },
    {
      variables: { ...values, picture: profile },
      update(_, { data }) {
        // setLoading(false);
        // setActive(false);
        // console.logg(data);
        if (data) {
          dispatch({
            type: "SET_USER",
            payload: data.updateUser,
          });
        }
      },
      onError(err) {
        console.log("An error occured while changing data");
        // setActive(false);
        // setLoading(false);
      },
    }
  );

  async function uploadImageUri(e) {
    e.preventDefault();

    // setLoading(true);s
    const storageRef = ref(
      firebaseStorage,
      `${user.id}/profile/${user.firstName}.jpg`
    );

    if (imgCrop.croppedImgUrl) {
      await uploadString(storageRef, imgCrop.croppedImgUrl, "data_url")
        .then(() => {
          console.log("Image has been uploaded");
        })
        .catch((err) => {
          console.log("Error uploading image: ", err);
        });

      await getDownloadURL(storageRef)
        .then((url) => {
          if (url) setProfile(url);
          else setProfile("");
        })
        .catch((err) => console.log(err));
    }

    onSubmit(e);
  }

  function updateUser() {
    updateProfile();
  }

  const handleEditProfileCancel = (e) => {
    e.preventDefault();

    if (JSON.stringify(user) !== JSON.stringify(values)) {
      // Do stuff here man
      document
        .querySelector(".app > .editProfile__overlay > .editProfile")
        .classList.toggle("save_discard_changes");

      return;
    }

    document
      .querySelector(".app > .editProfile__overlay")
      .classList.toggle("active");
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
      .querySelector(".app > .editProfile__overlay")
      .classList.toggle("active");

    document
      .querySelector(".app > .editProfile__overlay > .editProfile")
      .classList.toggle("save_discard_changes");

    updateValues(user);
  };

  return (
    <div className="editProfile__overlay">
      <section className="editProfile">
        <header className="editProfile__header">
          <span
            role="button"
            onClick={handleEditProfileCancel}
            className="icon-container"
          >
            <CloseIcon />
          </span>
        </header>

        <main className="editProfile__main">
          <form
            autoComplete="off"
            className="editProfile__mainForm"
            onSubmit={uploadImageUri}
          >
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
              <label htmlFor="studentNumber">Student number</label>
              <input
                className="editProfile__mainFormInput"
                name="studentNumber"
                type="text"
                id="studentNumber"
                value={values?.studentNumber}
                onChange={onChange}
                disabled
              />
              <p>
                Your student number is private. Only you can see it and cannot
                be changed.
              </p>
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
              />
              <p>Anyone on Qampus can see your email.</p>
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
          </form>

          <div className="editProfile__mainImage">
            <span>Profile Image</span>
            <div className="image-container">
              <img
                src={user?.picture || profilePlaceholder}
                alt="edit your profile"
              />
            </div>
            <button>Upload Image</button>

            {/* If user image exists the we remove it and show the person default */}
            <button>Remove Image</button>
          </div>
        </main>

        <footer className="editProfile__footer">
          <div>
            <button onClick={handleEditProfileCancel}>Cancel</button>
            <button>Save Changes</button>
          </div>
        </footer>

        <div className="editProfile__saveChanges">
          <p>
            You have <b>unsaved changes</b>, closing this window will discard
            them.
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
