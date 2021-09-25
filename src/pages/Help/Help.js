import "./Help.css";
import React, { useState } from "react";
import { about } from "../../text_files/about.json";
import { tutorial } from "../../text_files/tutorial.json";
import { safety } from "../../text_files/safety.json";
import { terms } from "../../text_files/terms.json";
import Button from "../../components/Button/Button";

function Help() {
  const [display, setDisplay] = useState({
    title: "Terms of use",
    content: terms,
  });

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
      <div className="help_side">
        <p>Help</p>
        <br />
        <hr className="sepatator" />
        <div className="buttons">
          <Button text="About us" onClick={() => tabBtnClicked("about")} />
          <Button text="Tutorials" onClick={() => tabBtnClicked("tutorials")} />
          <Button text="safety tips" onClick={() => tabBtnClicked("safety")} />
          <Button text="Terms of use" onClick={() => tabBtnClicked("terms")} />
          <Button text="Contact us" onClick={() => tabBtnClicked("")} />
        </div>
      </div>

      <div className="help_main">
        <p className="main_header"> {display.title}</p>
        <br />
        <hr className="sepatator" />
        <div className="main_content">
          <p>{display.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Help;
