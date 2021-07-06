import { useHistory } from "react-router-dom";
import Book from "../../components/Book/Book.js";

import "./Collection.css";

function Collection() {
  const history = useHistory();
  return (
    <div className="collection">
      <div className="collection__header">
        <p>Your books</p>
        <hr className="collection__headerSeparator" />
      </div>

      <section className="collection__body">
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
        <Book />
      </section>

      <footer className="collection__footer">
        <button onClick={() => history.push("/upload")}>Add New Book</button>
      </footer>
    </div>
  );
}

export default Collection;
