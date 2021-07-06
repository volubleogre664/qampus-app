import { useState } from "react";
import MenuIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import { useRouteMatch, Link } from "react-router-dom";

import { useUserHelpers, useMessagesHelpers } from "../../Redux/getSlices";

import "./HeaderMenu.css";

function HeaderMenu() {
  const [click, setClick] = useState(false);
  // const [isVisit, setVisit] = useState("");
  const [, dispatchUser] = useUserHelpers();
  const [, dispatchMessages] = useMessagesHelpers();

  const handleClick = () => {
    setClick(!click);
    document.querySelector(".nav__links").classList.toggle("opening");
  };

  const handleLogoutClick = () => {
    dispatchUser({
      type: "REMOVE_USER",
    });

    dispatchMessages({
      type: "CLEAR_MESSAGES",
    });
  };

  // const handleVisit = (e) => {
  //   const id = e.target.id;
  //   if (isVisit !== id) {
  //     const link = document.querySelector(id);
  //     link.style.color = "babyblue";

  //     if (isVisit !== "") {
  //       const link1 = document.querySelector(isVisit);
  //       link.style.color = "black";
  //     }
  //   }
  //   setVisit(id);
  // };

  return (
    <div className="header">
      <div className="header__button" onClick={handleClick}>
        {click ? <CloseIcon /> : <MenuIcon />}
      </div>

      <nav className="header__nav">
        <ul className="nav__links">
          <NavLink to="/" label="home" />
          <NavLink to="/upload" label="upload" />
          <NavLink to="/collection" label="collection" />
          <NavLink to="/chats" label="chats" />
          <NavLink to="/navigation" label="navigation" />
          <NavLink to="/profile" label="profile" />
          <NavLink to="/settings" label="settings" />
          <NavLink to="/help" label="help" />

          <li className="nav__linksItem">
            <p>|</p>
          </li>
          <li onClick={handleLogoutClick} className="nav__linksItem">
            <span>Logout</span>
          </li>
        </ul>
      </nav>
      <a href="/">
        <img
          className="header__logo"
          alt="qampus logo"
          src="../../logo.png"
        ></img>
      </a>
      <div className="gap"></div>
    </div>
  );
}

function NavLink({ to, label }) {
  const match = useRouteMatch({
    path: to,
    exact: true,
  });

  console.log(match);

  return (
    <li className={`nav__linksItem ${match?.isExact ? "active" : ""}`}>
      <Link to={to}>{label}</Link>
    </li>
  );
}

export default HeaderMenu;
