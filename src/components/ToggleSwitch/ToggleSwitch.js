import "./ToggleSwitch.css";

const ToggleSwitch = ({ label, id, ...rest }) => {
  return (
    <label htmlFor={id} className="switch__label">
      <span className="switch">
        <input type="checkbox" id={id} {...rest} />
        <span className="slider round"></span>
      </span>{" "}
      {label}
    </label>
  );
};

export default ToggleSwitch;
