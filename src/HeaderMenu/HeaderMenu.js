import React from "react";
import MenuIcon from "@material-ui/icons/MenuRounded";
import CloseIcon from "@material-ui/icons/CloseRounded";
import "./HeaderMenu.css";

function HeaderMenu() {
  return (
    <div className="nav__section">
      <img className="nav__logo" src="../logo.png"></img>
      <nav>
        <label for="mycheckbox" className="menu__button">
          <MenuIcon className="menu__icon" />
          {/* <CloseIcon className="close__icon"/> */}
        </label>
        <input type="checkbox" id="mycheckbox"></input>
        <ul class="nav_links">
          <li className="link__home">
            <a href="/">Home</a>
          </li>
          <li>
            <a href="#">Upload</a>
          </li>
          <li>
            <a href="#">Book Collection</a>
          </li>
          <li className="link__chat">
            <a href="/Chats">Chats</a>
          </li>
          <li>
            <a href="#">Navigation</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="./Login">Logout</a>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default HeaderMenu;
