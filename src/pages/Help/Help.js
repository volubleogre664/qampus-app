import "./Help.css";
import React, { useState } from "react";
import Iframe from "react-iframe";
import {terms} from "../../text files/terms.json";
import Button from "../../components/Button/Button";

let termsUrl = '../../text files/transcript.txt' // provide file location


function Help() {
  var [display, setDisplay] = useState(() => {
    return terms;
  });
  var [indicator, setIndicator] = useState(() => {
    return "Terms of use";
  });
 

  const about = "This is about us";
  const tutorial = "This is tutorial";
  const saftey = "This is saftey";

  function about_click() {
    display = setDisplay(about);
    indicator = setIndicator("About Us");
  }

  function saftey_click() {
    display = setDisplay(saftey);
    indicator = setIndicator("Saftey tips");
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
          <Button text="Saftey tips" onClick={saftey_click} />
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
