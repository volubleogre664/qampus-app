import React, { useState, useEffect } from "react";
import aboutData from '../../text_files/about.json';
import tutorialData from '../../text_files/tutorial.json';
import safetyData from '../../text_files/safety.json';
import termsData from '../../text_files/terms.json';
import "./Help.css";

function Help() {
  const { about } = aboutData;
  const { tutorial } = tutorialData;
  const { safety } = safetyData;
  const { terms } = termsData;
  const [display, setDisplay] = useState({
    title: "About us",
    content: about,
  });

  function tabBtnClicked(tab) {
    switch (tab) {
      case "safety": {
        setDisplay({ title: "Safety tips", content: safety });
        document.querySelector("#ter").style.background = "#8F8F8F";
        document.querySelector("#abt").style.background = "#8F8F8F";
        document.querySelector("#tut").style.background = "#8F8F8F";
        document.querySelector("#saf").style.background = "#009BF6";
        document.querySelector(".main_content").style.overflowY = "scroll";
        break;
      }

      case "tutorials": {
        setDisplay({ title: "Tutorials", content: tutorial });
        document.querySelector("#ter").style.background = "#8F8F8F";
        document.querySelector("#saf").style.background = "#8F8F8F";
        document.querySelector("#abt").style.background = "#8F8F8F";
        document.querySelector("#tut").style.background = "#009BF6";
        document.querySelector(".main_content").style.overflowY = "scroll";
        break;
      }

      case "about": {
        setDisplay({ title: "About us", content: about });
        document.querySelector("#ter").style.background = "#8F8F8F";
        document.querySelector("#saf").style.background = "#8F8F8F";
        document.querySelector("#tut").style.background = "#8F8F8F";
        document.querySelector("#abt").style.background = "#009BF6";
        document.querySelector(".main_content").style.overflowY = "scroll";
        break;
      }

      default: {
        setDisplay({ title: "Terms of use", content: terms });
        document.querySelector("#saf").style.background = "#8F8F8F";
        document.querySelector("#abt").style.background = "#8F8F8F";
        document.querySelector("#tut").style.background = "#8F8F8F";
        document.querySelector("#ter").style.background = "#009BF6";
        document.querySelector(".main_content").style.overflowY = "scroll";
      }
    }
  }

  function openInNewTab(url) {
    window.open(url, "_blank").focus();
  }
  useEffect(() => {
    tabBtnClicked("about");
  }, []);

  //text for different selected options
  return (
    <div className="help">
      <div className="help__header">
        <div className="buttons">
          <button
            id="abt"
            className="button"
            onClick={() => tabBtnClicked("about")}
          >
            About us
          </button>
          <button
            id="tut"
            className="button"
            onClick={() => tabBtnClicked("tutorials")}
          >
            Tutorials
          </button>
          <button
            id="saf"
            className="button"
            onClick={() => tabBtnClicked("safety")}
          >
            Safety tips
          </button>
          <button
            id="ter"
            className="button"
            onClick={() =>
              openInNewTab("https://nuclearsoftware.co.za/terms.html")
            }
          >
            Terms of use
          </button>
          {/* <button className="button" onClick={() => tabBtnClicked("")}>Contact us</button> */}
        </div>
      </div>

      <div className="help__body">
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
