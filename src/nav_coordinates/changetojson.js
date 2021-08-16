import fs from "fs";
const data = [];

const coordinates = fs
  .readFileSync("../client/src/nav_coordinates/CoodinateTableData.txt")
  .toString();
const buildings = fs
  .readFileSync("../client/src/nav_coordinates/BuildingTableData.txt")
  .toString();
const parking = fs
  .readFileSync("../client/src/nav_coordinates/ParkingTableData.txt")
  .toString();

// The buildings and parking have CoordinateID BuildingCode Name
const buildingsData = [];
buildings.split("\n").forEach((line) => {
  const lineContents = line.split("\t");

  buildingsData.push({
    id: lineContents[0],
    code: lineContents[1],
    buildingName: lineContents[2]?.replace("\r", ""),
  });
});

// Buildings data
const parkingData = [];
parking.split("\n").forEach((line) => {
  const lineContents = line.split("\t");

  parkingData.push({
    id: lineContents[0],
    code: lineContents[1],
    buildingName: lineContents[2]?.replace("\r", ""),
  });
});

// The coordinates have ID longitude latitude
const coordinatesData = [];
coordinates.split("\n").forEach((line) => {
  const lineContents = line.split("\t");

  coordinatesData.push({
    id: lineContents[0],
    longitude: lineContents[1],
    latitude: lineContents[2].replace("\r", ""),
  });
});

data.push({
  parking: parkingData,
  building: buildingsData,
  coordinates: coordinatesData,
});

fs.writeFileSync(
  "../client/src/nav_coordinates/nav_coordinates.json",
  JSON.stringify(data[0]),
  (err) => {
    if (err) {
      console.log(err);
      return;
    }

    console.log("File write done");
  }
);
