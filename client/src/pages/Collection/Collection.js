import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { DELETE_BOOK, GET_ALL_BOOKS } from "../../utils/graphql.js";
import Loader from "../../components/Loader/Loader.js";
import Book from "../../components/Book/Book.js";
import Button from "../../components/Button/Button";
import EditBook from "../../components/EditBook/EditBook.js";

import "./Collection.css";
import { useBooksHelpers, useUserHelpers } from "../../Redux/getSlices.js";

function Collection() {
  const history = useHistory();
  const [{ bookList: books }, dispatchBook] = useBooksHelpers();
  const [
    {
      user: { studentNumber },
    },
  ] = useUserHelpers();
  const [edit, setEdit] = useState({
    isEdit: false,
    bookInfo: {},
  });

  // TODO: Deal with the book component
  // Something is annoying
  const { loading } = useQuery(GET_ALL_BOOKS, {
    variables: { studentNumber },
    onCompleted({ getBooks: dbBooks }) {
      dbBooks.forEach((book) => {
        if (!books.find((item) => item.isbn === book.isbn)) {
          dispatchBook({
            type: "SET_LIBRARY_BOOK_LIST",
            payload: book,
          });
        }
      });
    },
    onError(err) {
      console.log(err);
    },
  });

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

  const editBookClicked = (id, title, price) => {
    setEdit({
      ...edit,
      isEdit: true,
      bookInfo: {
        id,
        title,
        price,
      },
    });
  };

  const cancelClicked = () => {
    setEdit({ ...edit, isEdit: false, bookInfo: {} });
  };

  return (
    <div className="collection">
      {edit.isEdit && <EditBook cancel={cancelClicked} {...edit.bookInfo} />}
      {loading && <Loader message="Getting your books" />}
      <div className="collection__header">
        <p>Your books</p>
        <hr className="collection__headerSeparator" />
      </div>

      <section className="collection__body">
        {books.map((book, i) => (
          <Book
            key={book.id}
            book={book}
            deleteBookClick={deleteBook}
            editBookClick={editBookClicked}
          />
        ))}
      </section>

      <footer className="collection__footer">
        <Button text="Add New Book" onClick={() => history.push("/upload")} />
      </footer>
    </div>
  );
}

export default Collection;
