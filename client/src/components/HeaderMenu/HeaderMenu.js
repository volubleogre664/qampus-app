import { useState } from "react";
import MenuIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import { useRouteMatch, Link } from "react-router-dom";

import { useUserHelpers, useMessagesHelpers } from "../../Redux/getSlices";

import "./HeaderMenu.css";

function HeaderMenu() {
  const [click, setClick] = useState(false);
  const [, dispatchUser] = useUserHelpers();
  const [, dispatchMessages] = useMessagesHelpers();

  const handleClick = () => {
    setClick(!click);
    document.querySelector(".nav__links").classList.toggle("opening");
  };

  const handleLogoutClick = () => {
    // eslint-disable-next-line no-restricted-globals
    const logout = confirm("Are you sure you want to logout?");

    if (logout) {
      dispatchUser({
        type: "REMOVE_USER",
      });

      dispatchMessages({
        type: "CLEAR_MESSAGES",
      });
    }
  };

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
          <NavLink label="|" />
          <NavLink onClick={handleLogoutClick} label="logout" />
        </ul>
      </nav>

      <Link to="/">
        <img
          className="header__logo"
          alt="qampus logo"
          src="../../logo.png"
        ></img>
      </Link>
      <div className="gap"></div>
    </div>
  );
}

function NavLink({ to = "", label, ...rest }) {
  const match = useRouteMatch({
    path: to,
    exact: true,
  });

  return (
    <li
      className={`nav__linksItem ${match?.isExact ? "active" : ""}`}
      {...rest}
    >
      <Link to={to}>{label}</Link>
    </li>
  );
}

export default HeaderMenu;
