import { useState } from "react";
import MenuIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import { Link } from "react-router-dom";

import { useUserHelpers, useMessagesHelpers } from "../../Redux/getSlices";

import "./HeaderMenu.css";

function HeaderMenu() {
  const [click, setClick] = useState(false);
  const [isVisit, setVisit] = useState("");
  const [, dispatchUser] = useUserHelpers();
  const [, dispatchMessages] = useMessagesHelpers();

  const handleClick = () => {
    setClick(!click);

    const nav = document.querySelector(".nav__links");

    nav.classList.toggle("opening");
    nav.classList.contains("closing") && nav.classList.toggle("closing");
  };

  const handleLogoutClick = () => {
    dispatchUser({
      type: "REMOVE_USER",
    });

    dispatchMessages({
      type: "CLEAR_MESSAGES",
    });
  };

  const handleVisit = (e) => {
    const id = e.target.id;
    if(isVisit !== id){
      const link = document.querySelector(id);
      link.style.color = "babyblue";

      if(isVisit !== ""){
        const link1 = document.querySelector(isVisit);
        link.style.color = "black";
      }
     
    }
    setVisit(id);
  };

  return (
    <div className="header">
      <div className="header__button" onClick={handleClick}>
        {click ? <CloseIcon /> : <MenuIcon />}
      </div>

      <nav className="header__nav">
        <ul className="nav__links">
          <li className="nav__linksItem">
            <Link to="/">Home</Link>
          </li>
          <li className="nav__linksItem">
            <Link id="Upload" onClick={handleVisit} to="/upload" >Upload</Link>
          </li>
          <li className="nav__linksItem">
            <Link id="Books" onClick={handleVisit} to="/collection">Book Collection</Link>
          </li>
          <li className="nav__linksItem">
            <Link id="Chats" onClick={handleVisit} to="/chats">Chats</Link>
          </li>
          <li className="nav__linksItem">
            <Link id="Navigation" onClick={handleVisit} to="/navigation">Navigation</Link>
          </li>
          <li className="nav__linksItem">
            <Link id="Settings" onClick={handleVisit} to="/profile">Settings</Link>
          </li>
          <li className="nav__linksItem">
            <Link id="Help" onClick={handleVisit} to="/help">Help</Link>
          </li>
        

          <li className="nav__linksItem">
            <p>|</p>
          </li>
          <li onClick={handleLogoutClick} className="nav__linksItem">
            <span>Logout</span>
          </li>
        </ul>
      </nav>
      <a href="/">
        <img className="header__logo" alt="qampus logo" src="../../logo.png"></img>
      </a>
      <div className="gap"></div>
    </div>
  );
}

export default HeaderMenu;
