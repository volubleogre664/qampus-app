import { useState } from "react";
import { useLocation } from "react-router";
import CheckIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

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
            <div className="formInput__passwordTips">
              <h4 className="formInput__passwordTipsTitle">
                Password must be at least 8 characters long and contain the
                following
              </h4>

              <div className="formInput__passwordTipsContent">
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
      {type === "password" && (
        <button className="formInput__showPassword" onClick={showHidePassword}>
          {(passwordType === "password" && (
            <VisibilityOffIcon className="passwordOff" />
          )) || <VisibilityIcon className="passwordOn" />}
        </button>
      )}
    </label>
  );
}

export default Input;
