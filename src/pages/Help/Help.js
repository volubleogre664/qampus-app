import "./Help.css";
import React, { useState } from "react";
import Iframe from "react-iframe";
import {terms} from "../../text files/terms.json";
import {tutorial} from "../../text files/tutorial.json";
import {about} from "../../text files/about.json";
import {safety} from "../../text files/safety.json";
import Button from "../../components/Button/Button";

let termsUrl = '../../text files/transcript.txt' // provide file location


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
    fetch(termsUrl)
    .then((res) =>{
      return res.text();
    }).then((data) => {
    });
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
