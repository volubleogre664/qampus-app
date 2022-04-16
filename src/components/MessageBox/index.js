import React from "react";
import { useHistory } from "react-router-dom";
import {
  useUtilsSlice,
  useUserSlice,
  useMessagesSlice,
} from "@redux/getSlices";

import "./MessageBox.css";

function MessageBox({ oncontinue = null }) {
  const [{ popup }, dispatch] = useUtilsSlice();
  const [, dispatchMessages] = useMessagesSlice();
  const [user, dispatchUser] = useUserSlice();
  const history = useHistory();

  const handleNoClick = () => {
    // document.querySelector(".msgbox__overlay").classList.toggle("active");
    dispatch({
      type: "",
    });

    if (user?.edit) {
      dispatchUser({
        type: "SET_EDIT_PROFILE",
        payload: { edit: false },
      });
    }
  };

  const handleYesClick = () => {
    if (oncontinue !== null) {
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
