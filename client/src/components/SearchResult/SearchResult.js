import { useLayoutEffect, useState } from "react";
import book from "./book.jpg";
import "./SearchResult.css";

// var book_description = "book description from DB goes here";
// var date_uploaded = "date from db goes here";

function SearchResult() {
  const [width, setWidth] = useState(0);

  // window.onresize = () =>
  //   console.log(document.querySelector(".triangle").style.width);

  // let mounted = true;
  useLayoutEffect(() => {
    setWidth(0.7 * (0.61 * window.innerWidth));
  }, [setWidth]);

  return (
    <div className="searchResult">
      <img src={book} alt="book result" className="searchResult__img" />
      <div className="searchResult__description">
        <b>ISBN:</b> 9781408046634
        <br />
        <b>Title:</b> Database Principles
        <br />
        <b>Module Code:</b> CSIS3714 <br />
        <b>Author:</b> Stephen Morris, David Smith <br />
        <b>Price:</b> R310,00 <br />
        <b>Edition: </b>2nd <br />
      </div>
      <span className="dateContainer">Uploaded: 17/06/2021</span>
      <span className="triangle" style={{ width: width + "px" }}></span>
    </div>
  );
}

export default SearchResult;
