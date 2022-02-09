import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import LibraryBooksIcon from "@mui/icons-material/BookOutlined";
import LibraryBooksIconA from "@mui/icons-material/BookRounded";
import {
  RiHome4Line,
  RiHome4Fill,
  RiMapPinRangeLine,
  RiMapPinRangeFill,
  RiMessageLine,
  RiMessageFill,
  RiInformationLine,
  RiInformationFill,
  RiMenuLine,
} from "react-icons/ri";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { useUserSlice } from "@redux/getSlices";
import logo from "@assets/logo_grey.png";
import "./HeaderMenu.css";

function HeaderMenu() {
  const [click, setClick] = useState(false);
  const [{ user }] = useUserSlice();
  const history = useHistory();

  const handleClick = () => {
    setClick(!click);
    // document.querySelector(".nav__links").classList.toggle("opening");
  };

  window.onresize = () => {
    if (window.innerWidth >= 690) setClick(false);
  };

  const handleUserClicked = (e) => {
    e.preventDefault();

    if (!user) {
      history.push("/login");
    } else {
      document.querySelector(".app > .profile").classList.toggle("active");
    }
  };

  return (
    <header className="header">
      <button className="header__button" onClick={handleClick}>
        {click ? <CloseIcon /> : <RiMenuLine />}
      </button>

      <div role="link" className="logoContainer">
        <img src={logo} alt="qampus" />
        <h2>Qampus</h2>
      </div>

      <nav className={`header__nav ${click && "nav__linksOpen"}`}>
        <ul className={"nav__links"}>
          <NavLink
            tooltip="Home"
            to="/"
            icon={<RiHome4Line />}
            active_icon={<RiHome4Fill />}
          />
          <NavLink
            tooltip="My Books"
            to="/collection"
            icon={<LibraryBooksIcon />}
            active_icon={<LibraryBooksIconA />}
          />
          <NavLink
            tooltip="My Chats"
            to="/chats"
            icon={<RiMessageLine />}
            active_icon={<RiMessageFill />}
          />
          <NavLink
            tooltip="My Campus"
            to="/navigation"
            icon={<RiMapPinRangeLine />}
            active_icon={<RiMapPinRangeFill />}
          />
          <NavLink
            tooltip="Help"
            to="/help"
            icon={<RiInformationLine />}
            active_icon={<RiInformationFill />}
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
          )) || "Sign in"}
        </button>
      </div>
    </header>
  );
}

function NavLink({ tooltip = "", to = "", icon, active_icon, ...rest }) {
  const match = useRouteMatch({
    path: to,
    exact: true,
  });

  return (
    <Link className="nav__linksItem__link" to={to}>
      <li
        className={`nav__linksItem ${match?.isExact ? "active" : ""}`}
        {...rest}
      >
        <p className="headerMenu__icon">
          {icon} <span>{tooltip}</span>
        </p>
        <p className="headerMenu__iconActive">
          {active_icon} <span>{tooltip}</span>
        </p>
        <div className="tooltip ">
          <p>{tooltip}</p>
        </div>
      </li>
    </Link>
  );
}

export default HeaderMenu;
