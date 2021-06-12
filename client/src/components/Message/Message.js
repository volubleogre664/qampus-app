import Book from "../Book/Book";

import dayjs from "dayjs";
import "./Message.css";

function Message({ messages, contact, from }) {
  return messages
    .filter((msg) => msg?.to === contact || msg?.from === contact)
    .map((msg, i) => (
      <div key={i} className={msg?.from === from ? "message rec" : "message"}>
        {/* Checks if book is available the sets render it */}
        {msg?.book && <Book state="chats_book" book={msg?.book} key={i} />}
        <p className="message__text">{msg?.textMsg}</p>

        <div className="message__time">
          {/* https://day.js.org/docs/en/display/format --> link for time formats */}
          {dayjs(msg?.time).format("HH:mm | DD MMM YYYY")}
        </div>

        <div className="message__state">{""}</div>
      </div>
    ));
}

export default Message;
