import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { DELETE_BOOK, GET_ALL_BOOKS } from "@utils/graphql.js";
import Loader from "@components/Loader";
import Book from "@components/Book";
import Button from "@components/Button";
import EditBook from "@components/EditBook";

import { useBooksSlice, useUserSlice } from "@redux/getSlices.js";
import popUpDialogue from "@utils/popUp.js";
import "./Collection.css";

function Collection() {
  const history = useHistory();
  const [{ bookList: books }, dispatchBook] = useBooksSlice();
  const [
    {
      user: { id: bookOwner },
    },
  ] = useUserSlice();
  const [edit, setEdit] = useState(false);
  const [book, setBook] = useState({ id: null, title: null, price: null });

  // TODO: Deal with the book component
  // Something is annoying
  const { loading } = useQuery(GET_ALL_BOOKS, {
    variables: { bookOwner },
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
    onCompleted(data) {
      dispatchBook({
        type: "DELETE_LIBRARY_BOOK",
        payload: data.deleteBook,
      });
      popUpDialogue({
        icon: "success",
        title: "Book Deleted!",
        text: "Book Deleted Successfully.",
        buttons: "okay",
      });
    },
    onError() {
      popUpDialogue({
        icon: "warning",
        title: "Book Not Deleted!",
        text: "Unable to delete the book... Please Try again",
        buttons: "okay",
      });
    },
  });

  const editBookClicked = (id, title, price) => {
    setBook({ id, title, price });

    setTimeout(() => setEdit(true), 50);
  };

  const cancelClicked = () => {
    setEdit(false);
  };

  useEffect(() => {
    document.title = "Book Collections - Qampus";
  }, []);

  return (
    <div className="collection">
      {edit && <EditBook cancel={cancelClicked} {...book} />}
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
