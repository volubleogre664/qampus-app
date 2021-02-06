import React from "react";
import "./Message.css";

function Message({messages}) {
  const state = false;
  const time = "12:00";

  return(
    messages.map(text => (
      <div className={state ? "message" : "message rec"}>
        <p className="message__text">
	  {text}
        </p>

        <div className="message__time">
	  {time}
        </div>

        <div className="message__state">{state}</div>
      </div>
    )) 
  );
}

export default Message;
