import React from "react";
import Iframe from "react-iframe";
import { Button } from "@material-ui/core";

import "./Navigation.css";

const _start_longitude = "19°6’41.81”S";
const _start_latitude = "26°11’9.66”E";
const _end_longitude = "29°6’41.95”S";
const _end_latitude = "16°11’3.05”E";

function GoogleMapsURLToEmbedURL(
  start_longitude,
  start_latitude,
  end_longitude,
  end_latitude
) {
  const dirPath =
    "https://www.google.co.za/maps/dir/" +
    start_longitude +
    start_latitude +
    "/" +
    end_longitude +
    end_latitude +
    "/";

  const coords = /\@([0-9\.\,\-a-zA-Z]*)/.exec(dirPath);
  if (coords != null) {
    const coordsArray = coords[1].split(",");
    const result =
      "https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d20000!2d" +
      coordsArray[1] +
      "!3d" +
      coordsArray[0] +
      "!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2suk!4v1486486434098";
    document.getElementsByClassName(".frame").src = result;
    return 0;
  }
}

function Navigation() {
  return (
    <div className="navigation">
      <div className="nav_input">
        <p>Navigator</p>
        <br />
        <hr className="sepatator" />
        <form className="navigation__form">
          <label>
            Starting location <br />
            <input type="text" name="Starting location" className="formInput" />
          </label>

          <label>
            Destination <br />
            <input type="text" name="Destination" className="formInput" />
          </label>

          <button
            className="get_directions"
            onClick={GoogleMapsURLToEmbedURL(
              _start_longitude,
              _start_latitude,
              _end_longitude,
              _end_latitude
            )}
          >
            GetDirections
          </button>
        </form>
      </div>
      <div className="nav_results" id="map">
        <Iframe
          className="frame"
          url="https://www.google.com/maps/embed?pb=!1m22!1m8!1m3!1d3485.83893509228!2d26.184412365631186!3d-29.110436082231697!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m4!2zMjnCsDbigJk0MS44MeKAnVMgMjbCsDEx4oCZOS42NuKAnUU!3m2!1d-29.1116139!2d26.1860167!4m4!2zMjnCsDA2JzMzLjAiUyAgMjbCsDExJzE0LjAiRQ!3m2!1d-29.1091667!2d26.187222199999997!5e0!3m2!1sen!2sza!4v1625048320489!5m2!1sen!2sza"
          allowfullscreen=""
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Navigation;
