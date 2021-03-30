import React, { useLayoutEffect, useState } from "react";
import book from "./book.jpg";
import "./SearchResult.css";

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
        ISBN: <strong>9781408046634</strong> <br />
        Title: <strong>Database Principles</strong> <br />
        Module Code: <strong>CSIS3714</strong> <br />
        Author: <strong>Stephen Morris, David Smith</strong> <br />
        Price: <strong>R300,00</strong> <br />
        Edition: <strong>2nd</strong> <br />
      </div>
      <span className="dateContainer">17/06/2021</span>
      <span className="triangle" style={{ width: width + "px" }}></span>
    </div>
  );
}

export default SearchResult;
