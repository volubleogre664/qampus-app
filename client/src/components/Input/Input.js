import { useState } from "react";
import { useLocation } from "react-router";
import CheckIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import ErrorIcon from "@material-ui/icons/Error";

import "./Input.css";

function Input({ label, id, type, testCases, ...rest }) {
  const { pathname: path } = useLocation();
  const [passwordType, setPasswordType] = useState(type);

  const showHidePassword = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (passwordType === type) setPasswordType("text");
    else setPasswordType(type);
  };

  // I used var to bypass the block scope
  if (testCases) {
    var { hasUppercase, hasLowercase, hasNumber } = testCases;
  }

  return (
    <label className="inputLabel" htmlFor={id}>
      {label}: <br />
      <input
        className="formInput"
        type={(type === "password" && passwordType) || type}
        id={id}
        {...rest}
      />
      {type === "password" &&
        !new RegExp(/confirm/).test(rest.name) &&
        path === "/register" && (
          <>
            <div className="formInput__tips">
              <h4 className="formInput__tipsTitle">
                Password must be at least 8 characters long and contain the
                following
              </h4>

              <div className="formInput__tipsContent">
                <span>
                  <CheckIcon
                    className={(hasUppercase && "success") || "fail"}
                  />
                  <span>Uppercase Letters</span>
                </span>
                <span>
                  <CheckIcon
                    className={(hasLowercase && "success") || "fail"}
                  />
                  <span>Lowercase Letters</span>
                </span>
                <span>
                  <CheckIcon className={(hasNumber && "success") || "fail"} />
                  <span>Numbers</span>
                </span>
              </div>
            </div>
            <span className="pointer"></span>
          </>
        )}
      <>
        {type === "password" && (
          <span
            role="button"
            tabIndex="-1"
            className="formInput__button"
            onClick={showHidePassword}
          >
            {(passwordType === "password" && (
              <VisibilityOffIcon className="passwordOff" />
            )) || <VisibilityIcon className="passwordOn" />}
          </span>
        )}
        {type === "email" && (
          <>
            <span className="formInput__button">
              {(rest.isValid && <CheckIcon className="emailValid" />) || (
                <ErrorIcon className="emailInvalid" />
              )}
            </span>

            {!rest.isValid && (
              <>
                <div className="formInput__tips">
                  <p>Please enter a valid email!</p>
                </div>
                <span className="pointer"></span>
              </>
            )}
          </>
        )}
      </>
    </label>
  );
}

export default Input;
