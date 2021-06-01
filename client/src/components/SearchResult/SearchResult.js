import { useLayoutEffect, useState } from "react";

import bookImg from "./book.jpg";

import "./SearchResult.css";

// var book_description = "book description from DB goes here";
// var date_uploaded = "date from db goes here";

function SearchResult({ book, history }) {
  const [width, setWidth] = useState(0);

  const handleBookClick = () => {
    history.push("/chats?user=" + book?.bookOwner);
  };

  useLayoutEffect(() => {
    setWidth(0.7 * (0.61 * window.innerWidth));
  }, [setWidth]);

  return (
    <div className="searchResult" onClick={handleBookClick}>
      <img
        src={book?.frontCover || bookImg}
        alt="book result"
        className="searchResult__img"
      />
      <div className="searchResult__description">
        <b>ISBN:</b> {book?.isbn || "9781408046634"}
        <br />
        <b>Title:</b> {book?.title || "Database Principles"}
        <br />
        <b>Author:</b> {book?.authors || "Stephen Morris, David Smith"} <br />
        <b>Price:</b> {`R${book?.price || "310,00"}`} <br />
      </div>
      <span className="dateContainer">Uploaded: 17/06/2021</span>
      <span className="triangle" style={{ width: width + "px" }}></span>
    </div>
  );
}

export default SearchResult;
