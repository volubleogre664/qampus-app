import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";

import { DELETE_BOOK, GET_ALL_BOOKS } from "@utils/graphql.js";
import Loader from "@components/Loader";
import Book from "@components/Book";
import Button from "@components/Button";
import EditBook from "@components/EditBook";
import MsgBox from "@components/MessageBox";

import {
  useBooksSlice,
  useUserSlice,
  useUtilsSlice,
} from "@redux/getSlices.js";

import { getStorage, deleteObject, ref } from "firebase/storage";
import "./Collection.css";

function Collection({ app }) {
  const history = useHistory();
  const [{ bookList: books }, dispatchBook] = useBooksSlice();
  const [
    {
      user: { id: bookOwner },
    },
  ] = useUserSlice();
  const [{ popup }, dispatchUtils] = useUtilsSlice();
  const [edit, setEdit] = useState(false);
  const [book, setBook] = useState({ id: null, title: null, price: null });
  const firebaseRef = getStorage(app);

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
      let book = books.find((item) => item.id === data.deleteBook);

      let imageRef = ref(
        firebaseRef,
        `${bookOwner}/books/${book.title.replace(/ /g, "_")}.jpg`
      );

      deleteObject(imageRef)
        .then(() => console.log("Book deleted successfully"))
        .catch((err) => console.log("Error encountered", err));

      dispatchBook({
        type: "DELETE_LIBRARY_BOOK",
        payload: data.deleteBook,
      });

      dispatchUtils({
        type: "DELETE_BOOK",
        payload: {
          title: "Book Deleted",
          subtitle: "Your book was deleted successfully.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });
    },
    onError(err) {
      console.log(err?.message);

      dispatchUtils({
        type: "DELETE_BOOK",
        payload: {
          title: "Delete Book Failed",
          subtitle:
            "An error occured whiilee deleting your bool, please try again",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });
    },
  });

  const editBookClicked = (id, title, price) => {
    setBook({ id, title, price });

    setTimeout(() => setEdit(true), 50);
  };

  function deleteBookFinal() {
    deleteBook({ variables: { id: popup.bookTitle } });
  }

  const cancelClicked = () => {
    setEdit(false);
  };

  useEffect(() => {
    document.title = "Book Collections - Qampus";
  }, []);

  return (
    <div className="collection">
      {edit && <EditBook cancel={cancelClicked} {...book} />}
      {edit && <div className="overlay" />}
      {loading && <Loader message="Getting your books" />}
      {popup.title === "Delete Book?" && (
        <MsgBox oncontinue={deleteBookFinal} />
      )}
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
