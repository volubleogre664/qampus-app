import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import profilePlaceholder from "./profile_placeholder.png";

import "./EditProfile.css";

function EditProfile() {
  const handleEditProfileCancel = (e) => {
    e.preventDefault();

    document
      .querySelector(".app > .editProfile__overlay")
      .classList.toggle("active");
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
          <form className="editProfile__mainForm">
            <div>
              <label htmlFor="firstName">First name</label>
              <input
                className="editProfile__mainFormInput"
                name="firstName"
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
              />
            </div>

            <div>
              <label htmlFor="studentNumber">Student number</label>
              <input
                className="editProfile__mainFormInput"
                name="studentNumber"
                type="text"
                id="studentNumber"
              />
            </div>

            <div>
              <label htmlFor="degree">Qualification</label>
              <input
                className="editProfile__mainFormInput"
                name="degree"
                type="text"
                id="degree"
              />
            </div>

            <div>
              <label htmlFor="email">Email address</label>
              <input
                className="editProfile__mainFormInput"
                name="email"
                type="text"
                id="email"
              />
            </div>
          </form>

          {/* The image that will float on the left */}
          {/* Turns out I am attached with flex lol */}
          <div className="editProfile__mainImage">
            <span>Profile Image</span>
            <div className="image-container">
              <img src={profilePlaceholder} alt="edit your profile" />
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
      </section>
    </div>
  );
}

export default EditProfile;
