import React from "react";
import "./Message.css";

function Message({text, time, state}) {
  return(
    <div className={state ? "message" : "message rec"}>
      <div className="message__text">
	  {text}
      </div>

      <div className="message__time">
	  {time}
      </div>

      <div className="message__state">{state}</div>
    </div>
  );
}

export default Message;
