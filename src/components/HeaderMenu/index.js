import { useState } from "react";
import AppsIcon from "@mui/icons-material/Apps";
import CloseIcon from "@mui/icons-material/CloseRounded";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { useUserSlice, useMessagesSlice } from "@redux/getSlices";
import ChatIcon from "@mui/icons-material/ChatRounded";
import BookIcon from "@mui/icons-material/BookRounded";
import LocationIcon from "@mui/icons-material/LocationOnRounded";
import PublishIcon from "@mui/icons-material/PublishRounded";
import ErrorIcon from "@mui/icons-material/ErrorRounded";
import HomeIcon from "@mui/icons-material/HomeRounded";
import logo from "./logo1.png";
import "./HeaderMenu.css";

function HeaderMenu() {
  const [click, setClick] = useState(false);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const [{ user }, dispatchUser] = useUserSlice();
  const [, dispatchMessages] = useMessagesSlice();
  const history = useHistory();

  window.onresize = () => setScreenSize(window.innerWidth);

  const handleClick = () => {
    if (screenSize > 800) return;

    setClick(!click);
    document.querySelector(".nav__links").classList.toggle("opening");
  };

  const handleUserClicked = (e) => {
    e.preventDefault();

    if (!user) {
      history.push("/login");
    } else {
      document.querySelector(".app > .profile").classList.toggle("active");
    }
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
    <header className="header">
      <div role="link" className="logoContainer">
        <img src={logo} alt="qampus" />
        <h2>Qampus</h2>
      </div>

      <nav className={`header__nav ${click && "active"}`}>
        <ul className="nav__links">
          <NavLink
            screensize={screenSize}
            onClick={handleClick}
            to="/"
            label="home"
          />
          <NavLink
            screensize={screenSize}
            onClick={handleClick}
            to="/upload"
            label="upload"
          />
          <NavLink
            screensize={screenSize}
            onClick={handleClick}
            to="/collection"
            label="collection"
          />
          <NavLink
            screensize={screenSize}
            onClick={handleClick}
            to="/chats"
            label="chats"
          />
          <NavLink
            screensize={screenSize}
            onClick={handleClick}
            to="/navigation"
            label="navigation"
          />
          <NavLink
            screensize={screenSize}
            onClick={handleClick}
            to="/help"
            label="help"
          />
        </ul>
      </nav>

      <div className="header__user">
        <button
          onClick={handleUserClicked}
          className={`header__userButton ${user && "userLoggedIn"} ${
            user?.picture && "userPicture"
          }`}
        >
          {(user?.picture ? (
            <img
              src={user?.picture}
              alt={user?.firstName + " " + user?.lastName}
            />
          ) : (
            user?.firstName[0] + user?.lastName[0]
          )) || "Login"}
        </button>
      </div>

      <div className="header__button" onClick={handleClick}>
        {click ? <CloseIcon /> : <AppsIcon />}
      </div>
    </header>
  );
}

const getIcon = (label) => {
  switch (label) {
    case "home":
      return <HomeIcon />;

    case "upload":
      return <PublishIcon />;

    case "collection":
      return <BookIcon />;

    case "help":
      return <ErrorIcon />;

    case "navigation":
      return <LocationIcon />;

    case "chats":
      return <ChatIcon />;

    default:
      return undefined;
  }
};

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
      {rest.screensize <= 470 && getIcon(label)}
      <Link to={to}>{label}</Link>
    </li>
  );
}

export default HeaderMenu;
