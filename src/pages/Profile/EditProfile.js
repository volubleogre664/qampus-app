import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useUserSlice } from "@redux/getSlices";
import { useForm } from "@utils/hooks.js";
import profilePlaceholder from "./profile_placeholder.png";

import "./EditProfile.css";

function EditProfile() {
  const [{ user }] = useUserSlice();

  const { onChange, onSubmit, values, updateValues } = useForm(null, user);

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
          <h2>Edit your profile</h2>
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
            onSubmit={onSubmit}
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

          {/* The image that will float on the left */}
          {/* Turns out I am attached with flex lol */}
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
