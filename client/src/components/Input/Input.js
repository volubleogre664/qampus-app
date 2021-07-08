import "./Input.css";

function Input({ label, id, ...rest }) {
  return (
    <label className="inputLabel" htmlFor={id}>
      {label}: <br />
      <input className="formInput" id={id} {...rest} />
    </label>
  );
}

export default Input;
