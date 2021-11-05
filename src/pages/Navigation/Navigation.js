import React, { useState, useEffect } from "react";
import Iframe from "react-iframe";
import Button from "@components/Button";
import SelectLocation from "@components/Select";
import { useForm } from "@utils/hooks";
import {
  building,
  coordinates,
} from "../../nav_coordinates/nav_coordinates.json";

import "./Navigation.css";

// The data for the coordinates is in coordinatesData above
// Its an object with buildings, parking and coordinates which are arrays with values
// buildings and parking are the same object with { id, code, buildingName }
// Coordinates have objects with { id, long, lat }

function Navigation() {
  const [currentLocation, setCurrentLocation] = useState(getCurrentLocation());
  const [active, setActive] = useState(() => {
    return "https://www.google.com/maps/embed";
  });
  const { onChange, values } = useForm(null, {
    startLocation: "",
    destination: (() => {
      let buildingOne = building[0];

      let buildingOneCoords = coordinates[buildingOne.id - 1];
      return buildingOneCoords.longitude + "__" + buildingOneCoords.latitude;
    })(),
  });

  // Set the current location by calling getCurrentLocation()
  if (!currentLocation) setCurrentLocation(getCurrentLocation());

  // The browser will ask to access the location and if user clicks allow we get the coords
  function getCurrentLocation() {
    const coords = {};
    navigator.geolocation.getCurrentPosition((pos) => {
      coords.latitude = pos.coords.latitude;
      coords.longitude = pos.coords.longitude;
    });

    return coords;
  }

  function GetDirections(
    start_longitude,
    start_latitude,
    end_longitude,
    end_latitude
  ) {
    var start_deg_long =
      Number(start_longitude) || getDecimalDeg(start_longitude);
    var start_deg_lat = Number(start_latitude) || getDecimalDeg(start_latitude);
    var end_deg_long = Number(end_longitude) || getDecimalDeg(end_longitude);
    var end_deg_lat = Number(end_latitude) || getDecimalDeg(end_latitude);

    var markerA = btoa(
      unescape(encodeURIComponent(start_latitude + " " + start_longitude))
    );
    var markerB = btoa(
      unescape(encodeURIComponent(end_latitude + " " + end_longitude))
    );

    var _result =
      "https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d0!2d26.187284!3d-29.107376!2m3!1f0!2f0" +
      "!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m4!2z" +
      markerA +
      "!3m2!1d" +
      start_deg_lat +
      "!2d" +
      start_deg_long +
      "!4m4!2z" +
      markerB +
      "!3m2!1d" +
      end_deg_lat +
      "!2d" +
      end_deg_long +
      "!5e0!3m2!1sen!2sza!4v1625379191755!5m2!1sen!2sza";
    return _result;
  }

  // GetLong and GetLat function should have been one function
  // This is it in one funtion
  function getDecimalDeg(coordinate) {
    // "29°6’19.89”S"
    let [deg, min, sec, dir] = coordinate.split(/[°’”"]/);

    let decimalDegrees = deg + "." + min / 60 + sec / 3600;

    if (dir === "W" || dir === "S") {
      decimalDegrees = decimalDegrees * -1;
    }

    return decimalDegrees;
  }

  // I put this back to onSubmit. No issues with it
  function changeState(e) {
    e.preventDefault();

    setActive(() => {
      let curr = currentLocation.longitude + "__" + currentLocation.latitude;
      let long =
        values.startLocation === ""
          ? curr.split("__")
          : values.startLocation.split("__");
      let lat = values.destination.split("__");

      return GetDirections(long[0], long[1], lat[0], lat[1]);
    });
  }

  useEffect(() => {
    document.title = "Navigation - Qampus";
  }, []);

  return (
    <div className="navigation">
      <aside className="navigation__sidebar">
        <h2 className="navigation__sidebarTitle">Navigator</h2>
        <hr className="sepatator" />
        <form className="navigation__sidebarForm" onSubmit={changeState}>
          <SelectLocation
            name="startLocation"
            id="startLocation"
            label="Start Location"
            building={building}
            coordinates={coordinates}
            currentlocation={currentLocation}
            onChange={onChange}
            value={values.startLocation}
          />

          <SelectLocation
            name="destination"
            coordinates={coordinates}
            value={values.destination}
            building={[].concat(building)}
            onChange={onChange}
            label="Destination"
            id="destination"
          />

          <Button text="Get Directions" type="submit" />
        </form>
      </aside>

      <main className="navigation__main" id="map">
        <header className="navigation__mainHeader">
          <h3>UFS main capmus</h3>
          <hr />
        </header>

        <Iframe
          className="navigation__mainFrame"
          id="frame"
          url={active}
          loading="lazy"
        ></Iframe>
      </main>
    </div>
  );
}

export default Navigation;
