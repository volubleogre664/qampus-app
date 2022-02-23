import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditRounded";
import { useUserSlice, useUtilsSlice } from "@redux/getSlices";
import profilePlaceholder from "@assets/profile.png";

import "./NewProfile.css";

function NewProfile() {
  const [{ user }, dispatchUser] = useUserSlice();
  const [, dispatch] = useUtilsSlice();

  const closeProfileClicked = (e) => {
    e.preventDefault();
    document.querySelector(".app > .profile").classList.toggle("active");
  };

  const logoutClicked = () => {
    dispatch({
      type: "LOGOUT",
      payload: {
        title: "Signing out?",
        subtitle: "Are you sure you want to sign out?",
        btnCancel: true,
        btnContinue: true,
        bookTitle: "",
        popupShow: true,
      },
    });
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    dispatchUser({
      type: "SET_EDIT_PROFILE",
      payload: { edit: true },
    });
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
            <h4>Email</h4>
            <p>{user?.email}</p>
          </div>

          {user?.university && (
            <div>
              <h4>School</h4>
              <p>{user?.university}</p>
            </div>
          )}

          {user?.campus && (
            <div>
              <h4>Your campus</h4>
              <p>{user?.campus}</p>
            </div>
          )}

          {user?.gender && (
            <div>
              <h4>Gender</h4>
              <p>{user?.gender}</p>
            </div>
          )}
        </main>
      </main>

      <footer className="profile__footer">
        <button
          onClick={() => logoutClicked()}
          className="profile__footerButton"
        >
          Sign Out
        </button>
      </footer>
    </aside>
  );
}

export default NewProfile;
