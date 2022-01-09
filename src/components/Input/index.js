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

  // Show or hide password by changing input type
  const showHidePassword = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (passwordType === type) setPasswordType("text");
    else setPasswordType(type);
  };

  // I used var to bypass the block scope
  // The test cases prop is an object with regular expressions for testing
  // if password hasNumber, hasLowercase and uppercase letters
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
      {/* This is the modal with password tips */}
      {/* Must show only when type is password and name is not confirmPassword */}
      {/* The path simply says only when path is register. No tips in login page */}
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
        {/* This is the show/hide password button / span with role button */}
        {type === "password" && (
          <>
            <span
              role="button"
              tabIndex="-1"
              className="formInput__button"
              onClick={showHidePassword}
            >
              {(passwordType === "password" && (
                <VisibilityOffIcon className="passwordOff" />
              )) || <VisibilityIcon className="passwordOn" />}
              {rest.name === "confirmPassword" &&
                rest.value &&
                ((rest.isvalid && <CheckIcon className="inputValid" />) || (
                  <ErrorIcon className="inputInvalid" />
                ))}
            </span>

            {type === "confirmPassword" && !rest.isvalid && rest.value && (
              <>
                <div className="formInput__tips">
                  <p>Confirm Password must be equal to Password!</p>
                </div>
                {/* The small arrow pointing to the input element from tips box */}
                <span className="pointer"></span>
              </>
            )}
          </>
        )}

        {/* Only shows on type email */}
        {type === "email" && rest.value && (
          <>
            {/* This is the icon on email input that shows whether email is valid or not */}
            <span className="formInput__button">
              {(rest.isvalid && <CheckIcon className="inputValid" />) || (
                <ErrorIcon className="inputInvalid" />
              )}
            </span>

            {/* This popup only shows when email is invalid */}
            {!rest.isvalid && (
              <>
                <div className="formInput__tips">
                  <p>Please enter a valid email!</p>
                </div>
                
                {/* The small arrow pointing to the input element from tips box */}
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
