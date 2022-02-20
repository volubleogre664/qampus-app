import React, { useState } from "react";
import { about } from "../../text_files/about.json";
import { tutorial } from "../../text_files/tutorial.json";
import { safety } from "../../text_files/safety.json";
import { terms } from "../../text_files/terms.json";
import {RiCloseLine,  RiMenuLine} from "react-icons/ri";
import "./Help.css";

function Help() {
  const [click, setClick] = useState(false);
  const [display, setDisplay] = useState({
    title: "About us",
    content: about,
  });
  const handleClick = () => {
    setClick(!click);
    document.querySelector(".help_side").classList.toggle("opening");
  };
  function tabBtnClicked(tab) {
    switch (tab) {
      case "safety": {
        setDisplay({ title: "Safety tips", content: safety });
        break;
      }

      case "tutorials": {
        setDisplay({ title: "Tutorials", content: tutorial });
        break;
      }

      case "about": {
        setDisplay({ title: "About us", content: about });
        break;
      }

      default: {
        setDisplay({ title: "Terms of use", content: terms });
      }
    }
  }

  return (
    <div className="help">
      <div className="help__header">
        <p className="main_header"> {display.title}</p>
        <button className="btnHeader" onClick={handleClick}>
          {click ? <RiCloseLine /> : <RiMenuLine />}
      </button>
      </div>
      <div className="help__body">
      <div className="help_side">
        <div className="buttons">
          <button className="button" onClick={() => tabBtnClicked("about")}>About us</button>
          <button className="button" onClick={() => tabBtnClicked("tutorials")}>Tutorials</button>
          <button className="button" onClick={() => tabBtnClicked("safety")}>Safety tips</button>
          <button className="button" onClick={() => tabBtnClicked("terms")}>Terms of use</button>
          {/* <button className="button" onClick={() => tabBtnClicked("")}>Contact us</button> */}
        </div>
      </div>

      <div className="help_main">
        <div className="main_content">
          <p>{display.content}</p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Help;
