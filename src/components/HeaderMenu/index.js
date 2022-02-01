import { useState } from "react";
import MenuIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/Close";
import ChatIcon from "@material-ui/icons/ChatOutlined";
import ChatIconA from "@material-ui/icons/ChatRounded";
import PublishIcon from "@material-ui/icons/PublishRounded";
import LoginIcon from "@mui/icons-material/LoginRounded";
import LibraryBooksIcon from "@material-ui/icons/BookOutlined";
import LibraryBooksIconA from "@material-ui/icons/BookRounded";
import LocationOnIcon from "@material-ui/icons/LocationOnOutlined";
import LocationOnIconA from "@material-ui/icons/LocationOnRounded";
import {AiOutlineHome, AiFillHome,AiOutlineBook, AiFillBook} from "react-icons/ai";
import {RiHome4Line, 
        RiHome4Fill, 
        RiMapPinRangeLine, 
        RiMapPinRangeFill, 
        RiMessageLine, 
        RiMessageFill,
        RiInformationLine,
        RiInformationFill,
        RiSuitcase2Line,
        RiSuitcase2Fill,
        RiTaxiLine,
        RiTaxiFill,
        RiBusLine,
        RiBusFill
      } from "react-icons/ri";
import HomeIconA from "@material-ui/icons/HomeRounded";
import ErrorIcon from "@material-ui/icons/ErrorOutline";
import ErrorIconA from "@material-ui/icons/ErrorRounded";
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
          <NavLink tooltip="Home" to="/" icon={<RiHome4Line />} active_icon={<RiHome4Fill/>}/>
          <NavLink tooltip="My Books" to="/collection" icon={<LibraryBooksIcon />} active_icon={<LibraryBooksIconA/>}/>
          <NavLink tooltip="My Chats" to="/chats" icon={<RiMessageLine />} active_icon={<RiMessageFill/>}/>
          <NavLink tooltip="My Campus" to="/navigation" icon={<RiMapPinRangeLine />} active_icon={<RiMapPinRangeFill/>}  />
          {/* <NavLink tooltip="Travel" to="/upload" icon={<RiSuitcase2Line/>} active_icon={<RiSuitcase2Fill/>} /> */}
          <NavLink tooltip="Travel" to="/upload" icon={<RiBusLine />} active_icon={<RiBusFill/>}/>
          <NavLink tooltip="Help" to="/help" icon={<RiInformationLine />} active_icon={<RiInformationFill/>}/>
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

function NavLink({ tooltip="",to = "", icon, active_icon, ...rest }) {
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
        <p className="headerMenu__icon">{icon}</p>
        <p className="headerMenu__iconActive">{active_icon}</p>
        <div class="tooltip ">
          <p>{tooltip}</p>
        </div>
      </li>

    </Link>
  );
}

export default HeaderMenu;
