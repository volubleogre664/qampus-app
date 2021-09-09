import CloseIcon from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

import { useUserSlice } from "../../Redux/getSlices";

import "./MessageBox.css";

function MessageBox({ errors, isOpen }) {
  const [, dispatch] = useUserSlice();

  const click = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_ERRORS",
      payload: {},
    });
  };

  return (
    <div className={`msgContainer ${Object.keys(errors).length && "open"}`}>
      <div className={`messageBox ${Object.keys(errors).length && "open"}`}>
        <div className="head">
          <h1>Errors while creatingg account</h1>
          <IconButton onClick={click}>
            <CloseIcon />
          </IconButton>
        </div>
        <div className="messageBox__errors">
          <ul>
            {Object.keys(errors).map((key) => (
              <li>{errors[key]}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* <button onClick={click}>clear</button> */}
    </div>
  );
}

export default MessageBox;
