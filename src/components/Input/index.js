import { useRef, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./Input.css";

function Input({ label, id, type, placeholder, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  let isPassword = id === "password" || id === "confirmPassword";

  return (
    <div className="input">
      <div className="input__container">
        <input
          className={`input__element ${isPassword && "password"}`}
          ref={inputRef}
          id={id}
          type={type}
          {...rest}
        />

        <label
          htmlFor={id}
          className={`placeholder ${rest?.value && "content"}`}
        >
          {label}
        </label>

        {type === "password" && (
          <button
            className="input__showPassword"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const input = document.getElementById(id);
              input.type = input.type === "password" ? "text" : "password";
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <VisibilityOffIcon />
            ) : (
              <VisibilityIcon color="balck" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Input;
