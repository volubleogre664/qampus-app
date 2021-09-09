import "./Help.css";
import React, { useState } from "react";

// You need to add the files and change everything accordingly
import * as terms from "../../text_files/terms.json";
import  * as tutorial from "../../text_files/tutorial.json";
import *  as about from "../../text_files/about.json";
import * as safety from "../../text_files/safety.json";
import Button from "../../components/Button/Button";

function Help() {
  var [display, setDisplay] = useState(() => {
    return terms;
  });
  var [indicator, setIndicator] = useState(() => {
    return "Terms of use";
  });

  function about_click() {
    display = setDisplay(about);
    indicator = setIndicator("About Us");
  }

  function safety_click() {
    display = setDisplay(safety);
    indicator = setIndicator("Safety tips");
  }

  function tutorial_click() {
    display = setDisplay(tutorial);
    indicator = setIndicator("Tutorials");
  }

  function terms_click() {
    display = setDisplay(terms);
    indicator = setIndicator("Terms of use");
  }

  return (
    <div className="help">
      <div className="help_side">
        <p>Help</p>
        <br />
        <hr className="sepatator" />
        <div className="buttons">
          <Button text="About us" onClick={about_click} />
          <Button text="Tutorials" onClick={tutorial_click} />
          <Button text="safety tips" onClick={safety_click} />
          <Button text="Terms of use" onClick={terms_click} />
        </div>
      </div>

      <div className="help_main">
        <p className="main_header"> {indicator}</p>
        <br />
        <hr className="sepatator" />
        <div className="main_content">
          <p>{display}</p>
        </div>
      </div>
    </div>
  );
}

export default Help;
