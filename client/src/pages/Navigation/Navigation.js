import React from "react";
import "./Navigation.css";
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = new Map({
  view: new View({
    center: [0, 0],
    zoom: 1
  }),
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  target: 'map'
});


function Navigation() {
  return (
    <div className="navigation" >
      <div className="nav_input">
      <p>Navigator</p><br/>
      <hr className="sepatator" />
      <form className="navigation__form">
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

      </form>
      </div>
      <div className="nav_results" id="map"></div>
    </div>
  );
}

export default Navigation;
