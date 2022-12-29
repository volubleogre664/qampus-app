import { useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Input.css";

function Input({ label, id, type, placeholder, ...rest }) {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);

  return (
    <div className="input">
      {/* <label htmlFor={id}>{label}</label> */}

      <div className="input__container">
        <input
          className="input__element"
          ref={inputRef}
          id={id}
          type={type}
          {...rest}
        />

        <div
          role="button"
          onClick={() => inputRef.current.click()}
          className={`placeholder ${rest?.value && "content"}`}
        >
          {label}
        </div>

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
