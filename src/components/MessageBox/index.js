import React from "react";
import { useHistory } from "react-router-dom";
import {
  useUtilsSlice,
  useUserSlice,
  useMessagesSlice,
} from "@redux/getSlices";

import "./MessageBox.css";

function MessageBox({ oncontinue }) {
  const [{ popup }, dispatch] = useUtilsSlice();
  const [, dispatchMessages] = useMessagesSlice();
  const [, dispatchUser] = useUserSlice();
  const history = useHistory();

  const handleNoClick = () => {
    // document.querySelector(".msgbox__overlay").classList.toggle("active");
    dispatch({
      type: "",
    });

    dispatchUser({
      type: "SET_EDIT_PROFILE",
      payload: { edit: false },
    });
  };

  const handleYesClick = () => {
    if (popup.title.toLowerCase().includes("delete book?")) {
      oncontinue();
      return;
    }

    if (!popup.btnCancel) {
      handleNoClick();
      return;
    }

    handleCases();
    // document.querySelector(".msgbox__overlay").classList.toggle("active");
  };

  const handleLogoutClick = () => {
    dispatchUser({
      type: "REMOVE_USER",
    });

    dispatchMessages({
      type: "CLEAR_MESSAGES",
    });

    document.querySelector(".app > .profile").classList.toggle("active");
    history.push("/");
    dispatch({});
  };

  function handleCases() {
    if (popup.title.toLowerCase().includes("signing")) {
      handleLogoutClick();
    }
  }

  return (
    <div className="msgbox__overlay">
      <main className="msgbox">
        <header>{popup.title}</header>
        <main>{popup.subtitle}</main>
        <footer>
          {popup.btnCancel && <button onClick={handleNoClick}>No</button>}
          {popup.btnContinue && (
            <button onClick={handleYesClick}>
              {(popup.btnCancel && "Yes") || "Okay"}
            </button>
          )}
        </footer>
      </main>
    </div>
  );
}

export default MessageBox;
