import Book from "../../components/Book";

import dayjs from "dayjs";
import "./Message.css";

function Message({ msg, from }) {
  return (
    <div
      id={msg.id}
      key={msg.id}
      className={msg?.from === from ? "message rec" : "message"}
    >
      {/* Checks if book is available then render it */}
      {msg?.book && (
        <Book
          className={msg?.from !== from ? "rec" : ""}
          state="chats_book"
          book={msg?.book}
          key={msg?.book.id}
        />
      )}
      <p className="message__text">{msg?.textMsg}</p>

      <div className="message__time">
        {/* https://day.js.org/docs/en/display/format --> link for time formats */}
        {dayjs(msg?.time).format("HH:mm | DD MMM YYYY")}
      </div>

      <div className="message__state">{""}</div>
    </div>
  );
}

export default Message;
