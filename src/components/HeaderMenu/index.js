import { useState } from "react";
import MenuIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import ChatIcon from "@material-ui/icons/ChatRounded";
import PublishIcon from "@material-ui/icons/PublishRounded";
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import LibraryBooksIcon from "@material-ui/icons/BookRounded";
import LocationOnIcon from "@material-ui/icons/LocationOnRounded";
import HomeIcon from "@material-ui/icons/HomeRounded";
import ErrorIcon from "@material-ui/icons/Error";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { useUserSlice, useMessagesSlice } from "@redux/getSlices";
import logo from "./logo_grey.png";
import "./HeaderMenu.css";

function HeaderMenu() {
  const [click, setClick] = useState(false);
  const [{ user }, dispatchUser] = useUserSlice();
  const [, dispatchMessages] = useMessagesSlice();
  const history = useHistory();

  const handleClick = () => {
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
      <div className="header__button" onClick={handleClick}>
        {click ? <CloseIcon /> : <MenuIcon />}
      </div>

      <div role="link" className="logoContainer">
        <img src={logo} alt="qampus" />
        <h2>Qampus</h2>
      </div>

      <nav className="header__nav">
        <ul className="nav__links">
          <NavLink onClick={handleClick} to="/" label={<HomeIcon />} />
          <NavLink onClick={handleClick} to="/collection" label={<LibraryBooksIcon />} />
          {/* <NavLink onClick={handleClick} to="/upload" label={<PublishIcon />} /> */}
          <NavLink onClick={handleClick} to="/chats" label={<ChatIcon />} />
          <NavLink onClick={handleClick} to="/navigation" label={<LocationOnIcon />} />
          <NavLink onClick={handleClick} to="/help" label={<ErrorIcon />}/>
          {/* <NavLink onClick={handleClick} to="/profile" label="profile" /> */}
          {/* <NavLink label="|" /> */}
          {/* <NavLink onClick={handleLogoutClick} label="logout" /> */}
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
          )) || "Sign in"}
        </button>
      </div>
    </header>
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
