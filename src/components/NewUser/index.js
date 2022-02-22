import { useState, useEffect, useRef } from "react";
import { useForm } from "@utils/hooks.js";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_USER } from "@utils/graphql.js";
import { useUserSlice, useUtilsSlice } from "@redux/getSlices";
import Loader from "@components/Loader";
import Compressor from "compressorjs";
import profilePlaceholder from "@assets/profile.png";
import {
  getStorage,
  ref,
  uploadString,
  getDownloadURL,
} from "firebase/storage";

import "./NewUser.css";

function NewUser({ app }) {
  const [{ user, imgCrop }, dispatch] = useUserSlice();
  const [profile, setProfile] = useState(user?.picture);
  const [loading, setLoading] = useState(false);
  const [, dispatchUtils] = useUtilsSlice();
  const firebaseStorage = getStorage(app);
  const fileInputRef = useRef(null);
  const { onSubmit, onChange, values } = useForm(updateUserData, {
    university: user?.university,
    campus: user?.campus,
    gender: user?.gender,
    degree: user?.degree,
  });

  const [updateProfile] = useMutation(UPDATE_USER, {
    variables: { ...values, picture: profile },
    update(_, { data }) {
      setLoading(false);
      // setActive(false);
      // console.logg(data);
      if (data) {
        dispatch({
          type: "SET_USER",
          payload: data.updateUser,
        });

        dispatchUtils({
          type: "DELETE_BOOK",
          payload: {
            title: "Details Updated",
            subtitle:
              "Your details were updated successfully. Please check your email inbox to verify your account.",
            btnCancel: false,
            btnContinue: true,
            bookTitle: "",
            popupShow: true,
          },
        });
      }
    },
    onError(err) {
      // setActive(false);
      setLoading(false);
      console.log("An error ooccured: ", err);
      console.log(err?.graphQLErrors);
    },
  });

  const handleFileInput = (inputEvent) => {
    const [file] = inputEvent.target.files;

    if (file) {
      new Compressor(file, {
        quality: 0.2,
        success(file) {
          const reader = new FileReader();

          reader.onload = (readerEvent) => {
            document.querySelector(".newUser__overlay").style.zIndex = -100;
            document.querySelector(".newUser__overlay").style.visibility =
              "hidden";

            dispatch({
              type: "SET_CROP_IMG",
              payload: {
                ...imgCrop,
                imgSrc: readerEvent.target.result,
              },
            });
          };

          window.scrollTo(0, 0);
          reader.readAsDataURL(file);
        },
        error(err) {
          console.log(err.message);
        },
      });
    }

    fileInputRef.current.value = "";
  };

  function updateUserData() {
    setLoading(true);
    updateProfile();
  }

  useEffect(() => {
    document.title = "Profile - Qampus";

    if (!imgCrop.croppedImgUrl) return;

    setLoading(true);
    document.querySelector(".newUser__overlay").style.zIndex = 301;
    document.querySelector(".newUser__overlay").style.visibility = "initial";
    const storageRef = ref(
      firebaseStorage,
      `${user.id}/profile/${user.firstName}.jpg`
    );

    (async () => {
      await uploadString(storageRef, imgCrop.croppedImgUrl, "data_url")
        .then(() => {
          console.log("Image has been uploaded");
          dispatch({
            type: "SET_CROP_IMG",
            payload: {
              croppedImgUrl: null,
            },
          });
        })
        .catch((err) => {
          console.log("Error uploading image: ", err);
        });

      await getDownloadURL(storageRef)
        .then((url) => {
          if (url) updateProfile({ variables: { picture: url } });
          else setProfile("");
        })
        .catch((err) => console.log(err));
    })();
    // }

    return () => {
      if (imgCrop.croppedImgUrl) {
        setLoading(false);
        dispatch({
          type: "SET_CROP_IMG",
          payload: {
            imgSrc: "",
            croppedImgUrl: null,
            aspect: null,
          },
        });
      }
    };
  }, [
    dispatch,
    imgCrop,
    firebaseStorage,
    user.firstName,
    user.id,
    updateProfile,
    setLoading,
  ]);

  return (
    <div className="newUser__overlay">
      <section className="newUser">
        {loading && <Loader />}
        <header className="newUser__header">
          <h2>Finish setting up your Qampus account</h2>
        </header>

        <main className="newUser__main">
          <form
            autoComplete="off"
            className="newUser__mainForm"
            // onSubmit={onSubmit}
          >
            <div>
              <label htmlFor="university">University</label>
              <input
                className="editProfile__mainFormInput"
                name="university"
                type="text"
                id="university"
                value={values?.university}
                onChange={onChange}
              />
              <p>Helps us show you things relavant only to your university</p>
            </div>

            <div>
              <label htmlFor="campusName">Campus</label>
              <input
                className="editProfile__mainFormInput"
                name="campus"
                type="text"
                id="campusName"
                value={values?.campus}
                onChange={onChange}
              />
              <p>Which {values?.university || "UFS"} campus are you on?</p>
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
              <label htmlFor="degree">Gender</label>
              <div className="newUser__mainFormRadio">
                <span>
                  <input
                    name="gender"
                    type="radio"
                    id="male"
                    value="Male"
                    onChange={onChange}
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
                  />
                  <label htmlFor="notSay">Rather not say</label>
                </span>
              </div>
              <p>
                Optional - Just select rather not say if you don't feel like it
              </p>
            </div>
          </form>

          <div className="newUser__mainImage">
            <span>Profile Image</span>
            <div className="image-container">
              <img
                src={user?.picture || profilePlaceholder}
                alt="edit your profile"
              />
              <input
                type="file"
                onChange={handleFileInput}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </div>
            <button onClick={() => fileInputRef.current.click()}>
              Upload Image
            </button>

            {/* If user image exists the we remove it and show the person default */}
            <button>Remove Image</button>
          </div>
        </main>

        <footer className="newUser__footer">
          <button onClick={onSubmit}>Continue</button>
        </footer>
      </section>
    </div>
  );
}

export default NewUser;
