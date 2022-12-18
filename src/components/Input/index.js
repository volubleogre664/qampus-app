import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Input.css";

function Input({ label, id, type, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>

      <div className="input__container">
        <input id={id} type={type} {...rest} />

        {type === "password" && (
          <button
            className="input__showPassword"
            onClick={(e) => {
              e.stopPropagation();
              const input = document.getElementById(id);
              input.type = input.type === "password" ? "text" : "password";
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <AiFillEyeInvisible color="black" />
            ) : (
              <AiFillEye color="balck" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
