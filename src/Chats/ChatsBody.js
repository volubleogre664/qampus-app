import React from "react";
import Message from "./Message";

function ChatsBody({messages}) {
  return (
    <div className="chats__mainBody">
      <Message messages={messages} />
    </div>
  );
}

export default ChatsBody;
