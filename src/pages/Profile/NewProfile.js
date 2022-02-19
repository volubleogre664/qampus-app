import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditRounded";
import {useUserSlice,useMessagesSlice,} from "@redux/getSlices";
import profilePlaceholder from "@assets/profile.png";

import "./NewProfile.css";

function NewProfile() {
  const [{ user }, dispatchUser] = useUserSlice();
  const [, dispatchMessages] = useMessagesSlice();

  const handleLoginMenuClick = () => {
    document.querySelector(".app > .profile").classList.toggle("active");
    if (user) {
      dispatchUser({
        type: "REMOVE_USER",
      });
  
      dispatchMessages({
        type: "CLEAR_MESSAGES",
      });
    }

  };
  const closeProfileClicked = (e) => {
    e.preventDefault();

    document.querySelector(".app > .profile").classList.toggle("active");
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    document
      .querySelector(".app > .editProfile__overlay")
      .classList.toggle("active");
  };

  return (
    <aside className="profile">
      <header className="profile__header">
        <h2>Profile</h2>
        <span
          role="button"
          onClick={closeProfileClicked}
          className="icon-container"
        >
          <CloseIcon />
        </span>
      </header>

      <main className="profile__main">
        <header>
          <div className="profile__imageContainer">
            <img
              className="profile__image"
              src={user?.picture || profilePlaceholder}
              alt={(user && user.firstName + " " + user.lastName) || ""}
            />
          </div>

          <div className="someInfo">
            <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
            <p>{user?.degree || ""}</p>
            <button onClick={handleEditProfile} className="profile__edit">
              <EditOutlinedIcon /> Edit profile
            </button>
          </div>
        </header>

        <main>
          <div>
            <h4>Student number</h4>
            <p>{user?.studentNumber}</p>
          </div>

          <div>
            <h4>Email</h4>
            <p>{user?.email}</p>
          </div>

          <div>
            <h4>School</h4>
            <p>University of the Free State</p>
          </div>

          {user?.bio && (
            <div>
              <h4>About you</h4>
              <p>{user?.bio}</p>
            </div>
          )}
        </main>
      </main>

      <footer className="profile__footer">
        <button onClick={handleLoginMenuClick} className="profile__footerButton" href="/login">Sign out</button>
      </footer>
    </aside>
  );
}

export default NewProfile;
