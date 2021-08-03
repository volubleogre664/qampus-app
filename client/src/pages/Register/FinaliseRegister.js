import { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useHistory, useLocation } from "react-router-dom";

import { UPDATE_USER } from "../../utils/graphql";
import { useForm } from "../../utils/hooks";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import Loader from "../../components/Loader/Loader";

import appLogo from "../../logo.png";
import { useUserHelpers } from "../../Redux/getSlices";

import "./FinaliseRegister.css";

import firebase from "firebase/app";

function CompleteRegistration() {
  const history = useHistory();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState("");
  const [
    {
      user,
      imgCrop: { croppedImgUrl },
    },
    dispatchUser,
  ] = useUserHelpers();

  const { onChange, onSubmit, values } = useForm(updateUser, {
    picture: "",
    degree: "",
    bio: "",
  });

  async function uploadImageUri(e) {
    e.preventDefault();

    setLoading(true);
    const storageRef = firebase
      .storage()
      .ref(`${user.id}/profile/${user.firstName}.jpg`);

    if (croppedImgUrl) {
      await storageRef
        .putString(croppedImgUrl, "data_url")
        .then(() => {
          console.log("Image has been uploaded");
        })
        .catch((err) => {
          console.log("Erroruploading image: ", err);
        });
    }

    await storageRef
      .getDownloadURL()
      .then((url) => setProfile(url))
      .catch((err) => console.log(err));

    onSubmit(e);
  }

  // Pushing data to The server then the database
  const [updateProfile] = useMutation(UPDATE_USER, {
    variables: { ...values, picture: profile },
    update(_, { data }) {
      setLoading(false);
      if (data) {
        console.log(data);
        dispatchUser({
          type: "SET_USER",
          payload: data.updateUser,
        });
      }

      const { from } = location.state || { from: { pathname: "/" } };
      history.replace(from);
    },
    onError(err) {
      console.log(err);

      setLoading(false);
    },
  });

  const finishLaterClick = () => {
    const { from } = location.state || { from: { pathname: "/" } };
    history.replace(from);
  };

  function updateUser() {
    updateProfile();
  }

  useEffect(() => {
    document.title = "Finish Signing Up - Qampus";
  }, []);

  return (
    <div className="finaliseReg">
      {loading && <Loader />}
      <header className="finaliseReg__header">
        <img className="logo" src={appLogo} alt="campus app logo" />
        <h1 className="title">Complete your profile</h1>
        <hr className="separator" />
      </header>

      <section className="finaliseReg__body">
        <aside className="finaliseReg__bodyAside">
          <ProfileImage />
        </aside>

        <main className="finaliseReg__bodyMain">
          <h1>More information about you: </h1>
          <form onSubmit={uploadImageUri}>
            <Input
              type="select"
              name="degree"
              placeholder="BSc in IT"
              value={values.degree}
              onChange={onChange}
              id="degree"
              label="Degree"
            />

            <label htmlFor="bio">
              Bio: <br />
              <textarea
                name="bio"
                id="bio"
                onChange={onChange}
                placeholder="Tell us a little about you..."
                value={values.bio}
              />
            </label>

            <footer>
              <Button onClick={finishLaterClick} text="cancel" />
              <Button type="submit" text="submit" />
            </footer>
          </form>
        </main>
      </section>
    </div>
  );
}

export default CompleteRegistration;
