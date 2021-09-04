import { useEffect, useState } from "react";
import { GoVerified } from "react-icons/go";
import { useMutation } from "@apollo/react-hooks";
import firebase from "firebase/app";

import Input from "../../components/Input/Input";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Button/Button";
import ProfileImage from "../../components/ProfileImage/ProfileImage";

import { UPDATE_USER } from "../../utils/graphql";
import { useUserSlice } from "../../Redux/getSlices";
import { useForm } from "../../utils/hooks";

import "./Profile.css";

function Profile() {
  const [isEmail, setIsEmail] = useState(true);
  const [active, setActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const firebaseStorage = firebase.storage();
  const [{ user, imgCrop }, dispatch] = useUserSlice();

  const { onSubmit, onChange, values } = useForm(updateUser, user);

  const [updateProfile] = useMutation(UPDATE_USER, {
    variables: { ...values, picture: profile },
    update(_, { data }) {
      setLoading(false);
      setActive(false);
      if (data) {
        dispatch({
          type: "SET_USER",
          payload: data.updateUser,
        });
      }
    },
    onError(err) {
      console.log(err);
      setActive(false);
      setLoading(false);
    },
  });

  async function uploadImageUri(e) {
    e.preventDefault();

    setLoading(true);
    const storageRef = firebaseStorage.ref(
      `${user.id}/profile/${user.firstName}.jpg`
    );

    if (imgCrop.croppedImgUrl) {
      await storageRef
        .putString(imgCrop.croppedImgUrl, "data_url")
        .then(() => {
          console.log("Image has been uploaded");
        })
        .catch((err) => {
          console.log("Erroruploading image: ", err);
        });
    }

    await storageRef
      .getDownloadURL()
      .then((url) => {
        if (url) setProfile(url);
        else setProfile("");
      })
      .catch((err) => console.log(err));

    onSubmit(e);
  }

  function updateUser() {
    updateProfile();
  }

  useEffect(() => {
    document.title = "Profile - Qampus";

    return () => {
      if (imgCrop.croppedImgUrl) {
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
  }, [dispatch, imgCrop]);

  return (
    <div className="profile">
      {loading && <Loader message="Updating data" />}
      <header className="profile__header">
        <p>
          {user?.firstName} {user?.lastName}
          <GoVerified className="profile__headerIcon" />
        </p>{" "}
        <hr />
      </header>

      <section className="profile__body">
        <aside className="profile__bodyAside">
          <ProfileImage src={user?.picture} />
        </aside>

        <main className="profile__bodyMain">
          <div
            style={{ display: active ? "none" : "flex" }}
            className="profile__bodyMainInfo"
          >
            <div>
              <h4>Student number:</h4>
              <p>{values.studentNumber}</p>
            </div>
            <div>
              <h4>Email:</h4>
              <p>{values.email}</p>
            </div>
            <div>
              <h4>Field of study:</h4>
              <p>{values.degree}</p>
            </div>
            <div>
              <h4>Bio:</h4>
              <p>{values.bio}</p>
            </div>
            <Button text="Edit Info" onClick={() => setActive(!active)} />
          </div>

          <form
            style={{ display: active ? "flex" : "none" }}
            className="profile__bodyMainForm"
            onSubmit={uploadImageUri}
          >
            <div>
              <h3>Change your details</h3>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setActive(!active);
                }}
                className="btnBack"
              >
                X
              </button>
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              id="email"
              value={values.email}
              isvalid={isEmail.toString()}
              onChange={(e) => {
                const emailRegex = new RegExp(
                  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/
                );
                setIsEmail(emailRegex.test(e.target.value));
                onChange(e);
              }}
            />

            <Input
              label="Field of study"
              id="degree"
              type="text"
              name="degree"
              onChange={onChange}
              value={values.degree}
            />

            {/* The style for this is in App.css : Generic for all textareas */}
            <label htmlFor="degree" className="formTextareaLabel">
              Bio:
              <textarea
                className="formTextarea"
                name="bio"
                id="bio"
                onChange={onChange}
                value={values.bio}
              />
            </label>

            {/* <Button type="submit" text="cancel" /> */}
            <Button type="submit" text="Save" />
          </form>
        </main>
      </section>
    </div>
  );
}

export default Profile;
