import React, { useState } from "react";
import MenuIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import "./HeaderMenu.css";
import { Link } from "react-router-dom";

function HeaderMenu() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);

    const nav = document.querySelector(".nav__links");

    nav.classList.toggle("opening");
    nav.classList.contains("closing") && nav.classList.toggle("closing");
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
            <Link to="/upload">Upload</Link>
          </li>
          <li className="nav__linksItem">
            <Link to="/library">Book Collection</Link>
          </li>
          <li className="nav__linksItem">
            <Link to="/Chats">Chats</Link>
          </li>
          <li className="nav__linksItem">
            <Link to="/navigation">Navigation</Link>
          </li>
          <li className="nav__linksItem">
            <Link to="/settings">Settings</Link>
          </li>
          <li className="nav__linksItem">
            <Link to="/help">Help</Link>
          </li>
          <li className="nav__linksItem">
            <Link to="/profile">Profile</Link>
          </li>
          <li className="nav__linksItem">
            <Link to="/Login">Logout</Link>
          </li>
        </ul>
      </nav>
      <img className="header__logo" alt="qampus logo" src="../logo.png"></img>
    </div>
  );
}

export default HeaderMenu;
