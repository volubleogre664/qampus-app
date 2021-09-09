import "./SelectLocation.css";

function SelectLocation({ currentlocation, building, coordinates, ...rest }) {
  if (currentlocation) {
    var { latitude, longitude } = currentlocation;
  }
  return (
    <label htmlFor={rest.id} className="selectInput__label">
      {rest.label} <br />
      <select {...rest} className="selectInput">
        {currentlocation && (
          <option value={`${longitude}__${latitude}`}>
            -- Current Location --
          </option>
        )}

        {building.map((item) => {
          const coords = coordinates.find((coord) => coord.id === item.id);

          return (
            <option
              key={item.code + "_start"}
              value={`${coords.longitude}__${coords.latitude}`}
            >
              {item.buildingName}
            </option>
          );
        })}
      </select>
    </label>
  );
}

export default SelectLocation;
