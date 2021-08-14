import "./Help.css";
import React, { useState } from "react";
import Iframe from "react-iframe";
import terms_text from "../../text files/terms.js";
import Button from "../../components/Button/Button";

const fileUrl = '../../text files/transcript.txt' // provide file location
var _terms = " ";
fetch('../../text files/transcript.txt')
.then(response => response.text())
.then(data => {
  _terms=data;
});

function FileHelper() {
  FileHelper.readStringFromFileAtPath = function (pathOfFileToReadFrom) {
    var request = new XMLHttpRequest();
    request.open("GET", pathOfFileToReadFrom, false);
    request.send(null);
    var returnValue = request.responseText;

    return returnValue;
  };
}

function Help() {
  var [display, setDisplay] = useState(() => {
    return terms_text;
  });
  var [indicator, setIndicator] = useState(() => {
    return "Terms of use";
  });
  var fr = new FileReader();
  const about = "This is about us";
  const tutorial = "This is tutorial";
  const saftey = "This is saftey";
  const terms = terms_text;

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
    display = setDisplay(_terms);
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
        -
      </div>
    </div>
  );
}

export default Help;
