import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Button from "../../components/Button/Button";
import { DELETE_BOOK } from "../../utils/graphql.js";
import Book from "../../components/Book/Book.js";
import EditBook from "../../components/EditBook/EditBook.js";

import "./Collection.css";

function Collection() {
  const history = useHistory();
  const [edit, setEdit] = useState({
    isEdit: false,
    bookInfo: {},
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

  // const [editBook] = useMutation(EDIT_BOOK, {
  //   // TODO: Let's continue this.
  //   // Needs to be linked with this page: collection, the Book EditBook Component
  // });

  return (
    <div className="collection">
      {edit.isEdit && <EditBook cancel={cancelClicked} {...edit.bookInfo} />}
      <div className="collection__header">
        <p>Your books</p>
        <hr className="collection__headerSeparator" />
      </div>

      <section className="collection__body">
        <Book deleteBookClick={deleteBook} editBookClick={editBookClicked} />
        <Book deleteBookClick={deleteBook} editBookClick={editBookClicked} />
        <Book deleteBookClick={deleteBook} editBookClick={editBookClicked} />
        <Book deleteBookClick={deleteBook} editBookClick={editBookClicked} />
        <Book deleteBookClick={deleteBook} editBookClick={editBookClicked} />
        <Book deleteBookClick={deleteBook} editBookClick={editBookClicked} />
      </section>

      <footer className="collection__footer">
        <Button  text="Add New Book" onClick={() => history.push("/upload")}/>
      </footer>
    </div>
  );
}

export default Collection;
