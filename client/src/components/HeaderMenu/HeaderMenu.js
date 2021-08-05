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
    handleClick();
    import("../../utils/popUp.js").then((mbox) =>
      mbox.default({
        title: "Logging out!",
        text: "Are you sure you want to logout?",
        callback: () => {
          dispatchUser({
            type: "REMOVE_USER",
          });

          dispatchMessages({
            type: "CLEAR_MESSAGES",
          });
        },
      })
    );
  };

  return (
    <div className="header">
      <div className="header__button" onClick={handleClick}>
        {click ? <CloseIcon /> : <MenuIcon />}
      </div>

      <nav className="header__nav">
        <ul className="nav__links">
          <NavLink onClick={handleClick} to="/" label="home" />
          <NavLink onClick={handleClick} to="/upload" label="upload" />
          <NavLink onClick={handleClick} to="/collection" label="collection" />
          <NavLink onClick={handleClick} to="/chats" label="chats" />
          <NavLink onClick={handleClick} to="/navigation" label="navigation" />
          <NavLink onClick={handleClick} to="/profile" label="profile" />
          <NavLink onClick={handleClick} to="/help" label="help" />
          <NavLink onClick={handleClick} label="|" />
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
