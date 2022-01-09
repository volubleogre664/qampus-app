import React from "react";
import { useHistory } from "react-router-dom";
import LoginIcon from "@mui/icons-material/LoginRounded";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import ProfileIcon from "@mui/icons-material/ManageAccountsRounded";

import { useUserSlice } from "@redux/getSlices.js";

function Avatar({ userLogout }) {
  const [{ user }] = useUserSlice();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();

    const paths = {
      login: "/login",
      profile: "/profile",
    };

    if (e.target.name === "logout") userLogout();
    else history.push(paths[e.target.name]);
  };

  return (
    <div className="avatarOptions">
      <button
        className={`avatarOptions__button ${user && "active"}`}
        name="profile"
        onClick={handleClick}
      >
        <ProfileIcon /> Profile
      </button>

      <button
        className="avatarOptions__button"
        name={user ? "login" : "logout"}
        onClick={handleClick}
      >
        {user ? <LogoutIcon /> : <LoginIcon />}
        {user ? "Logout" : "Login"}
      </button>
    </div>
  );
}

export default Avatar;
