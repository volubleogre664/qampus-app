import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { DELETE_BOOK } from "../../utils/graphql.js";
import Book from "../../components/Book/Book.js";

import "./Collection.css";

function Collection() {
  const history = useHistory();

  const [deleteBook] = useMutation(DELETE_BOOK, {
    variables: { id: 2 },
    onCompleted(data) {
      alert(data.deleteBook);
    },
    onError(err) {
      alert("Failed to delete the book \nCheck error in the console.");
      console.log(err);
    },
  });

  return (
    <div className="collection">
      <div className="collection__header">
        <p>Your books</p>
        <hr className="collection__headerSeparator" />
      </div>

      <section className="collection__body">
        <Book deleteBookClick={deleteBook} />
        <Book deleteBookClick={deleteBook} />
        <Book deleteBookClick={deleteBook} />
        <Book deleteBookClick={deleteBook} />
        <Book deleteBookClick={deleteBook} />
        <Book deleteBookClick={deleteBook} />
      </section>

      <footer className="collection__footer">
        <button onClick={() => history.push("/upload")}>Add New Book</button>
      </footer>
    </div>
  );
}

export default Collection;
