import React from "react";
import "./Message.css";

function Message({ messages }) {
  return messages.map((msg) => (
    <div className={msg.sent ? "message" : "message rec"}>
      <p className="message__text">{msg.text}</p>

      <div className="message__time">
        {msg.time.substr(0, msg.time.length - 6)}
      </div>

      <div className="message__state">{""}</div>
    </div>
  ));
}

export default Message;
