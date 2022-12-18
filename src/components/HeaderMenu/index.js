import LibraryBooksIcon from "@mui/icons-material/BookOutlined";
import LibraryBooksIconA from "@mui/icons-material/BookRounded";
import {
  RiHome4Line,
  RiHome4Fill,
  RiMap2Line,
  RiMap2Fill,
  RiMessageLine,
  RiMessageFill,
  RiInformationLine,
  RiInformationFill,
} from "react-icons/ri";
import { VscAccount } from "react-icons/vsc";
import { useRouteMatch, Link, useHistory } from "react-router-dom";
import { useUserSlice } from "@redux/getSlices";
import logo from "@assets/Qampus_logo_grey.png";
import "./HeaderMenu.css";

function HeaderMenu() {
  const [{ user }] = useUserSlice();
  const history = useHistory();

  const handleUserClicked = (e) => {
    e.preventDefault();

    if (!user) {
      history.push("/login");
    } else {
      document.querySelector(".app > .profile").classList.toggle("active");
    }
  };

  const logoClicked = () => history.push("/");

  const setProfilePicture = () => {
    if (user?.picture) {
      return (
        <img src={user.picture} alt={user.firstName + " " + user.lastName} />
      );
    } else if (user?.firstName !== undefined) {
      return user.firstName[0] + user.lastName[0];
    } else {
      return <VscAccount />;
    }

    // return user?.picture ? (
    //   <img src={user?.picture} alt={user?.firstName + " " + user?.lastName} />
    // ) : user ? (
    //   firstName[0] && user?.lastName[0] ? (
    //     user?.firstName[0] + user?.lastName[0]
    //   ) : (
    //     <VscAccount />
    //   )
    // ) : (
    //   <VscAccount />
    // );
  };

  return (
    <header className="header">
      <div onClick={logoClicked} role="button" className="logoContainer">
        <img src={logo} alt="qampus" />
        <h2>Qampus</h2>
      </div>

      <nav className="header__nav">
        <ul className="nav__links">
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
            icon={<RiMap2Line />}
            active_icon={<RiMap2Fill />}
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
          {setProfilePicture()}
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
        <p className="headerMenu__icon">{icon}</p>
        <p className="headerMenu__iconActive">{active_icon}</p>
        <div className="tooltip ">
          <p>{tooltip}</p>
        </div>
      </li>
    </Link>
  );
}

export default HeaderMenu;
