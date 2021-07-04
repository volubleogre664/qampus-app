import "./Navigation.css";
import React from "react";
import Iframe from 'react-iframe'

function Navigation() {
  
  var _start_latitude = "29°6’33.75”S";
  var _start_longitude = "26°11’26.48”E";
  var _end_latitude = "29°6’19.89”S";
  var _end_longitude = "26°11’18.08”E";
    
  function GetDirections(start_longitude, start_latitude, end_longitude, end_latitude)
  {
      var start_deg_long = GetLong(start_longitude);
      var start_deg_lat = GetLat(start_latitude);
      var end_deg_long = GetLong(end_longitude);
      var end_deg_lat = GetLat(end_latitude);

      var markerA = btoa(unescape(encodeURIComponent(start_latitude + ' ' + start_longitude)));
      var markerB = btoa(unescape(encodeURIComponent(end_latitude + ' ' + end_longitude)));

      var _result = "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d0!2d26.187284!3d-29.107376!2m3!1f0!2f0"+
                    "!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m4!2z"+markerA+"!3m2!1d"
                    +start_deg_lat+"!2d"+start_deg_long+"!4m4!2z"+markerB+"!3m2!1d"
                    +end_deg_lat+"!2d"+end_deg_long+"!5e0!3m2!1sen!2sza!4v1625379191755!5m2!1sen!2sza";
                     
      return _result;
  }

  function GetLong(longitude){

    if(longitude.trim()){}
    var parts = longitude.split('°');
    var deg = parts[0];
    var min_sec = parts[1].split('’');
    var min = min_sec[0];
    var sec_dir = min_sec[0].split('”');
    var sec = sec_dir[0];
    var dir = sec_dir[1];
    
    var decimalDegrees = deg + "." + (min/60) + (sec/3600);

    if(dir==="W"){
      decimalDegrees = decimalDegrees * -1;
    }

    return decimalDegrees;
  }
  
  function GetLat(latitude){
    var parts = latitude.split('°');
    var deg = parts[0];
    var min_sec = parts[1].split('’');
    var min = min_sec[0];
    var sec_dir = min_sec[0].split('”');
    var sec = sec_dir[0];
    var dir = sec_dir[1];
    
    var decimalDegrees = deg + "." + (min/60) + (sec/3600);

    if(dir==="S"){
      decimalDegrees = decimalDegrees * -1;
    }
    return decimalDegrees;
  }

  return (
    <div className="navigation" >
      <div className="nav_input">
      <a
          className="reference_link"
          target="_blank"
          rel="noreferrer"
        > <p>Navigator</p><br/>
        </a>
        <hr className="sepatator" />
        <form className="navigation__form" >
          <label>
            Starting location <br />
            <input
              type="text"
              name="Starting location"
              className="formInput"
            />
          </label>

          <label>
            Destination <br />
            <input
              type="text"
              name="Destination"
              className="formInput"
            />
          </label>

          <button className="get_directions" >Get Directions</button>
        </form>
      </div>

      <div className="nav_results" id="map">
        <Iframe 
          className="frame"
          id="_frame"
          url={GetDirections(_start_longitude, _start_latitude, _end_longitude, _end_latitude)}
          loading="lazy"
        ></Iframe>
      </div>
    </div>
  );
}



export default Navigation;
