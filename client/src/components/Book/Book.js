import InfoIcon from "@material-ui/icons/InfoOutlined";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import PencilIcon from "@material-ui/icons/EditRounded";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";

import imgSrc from "./img.jpg";

import "./Book.css";

function Book({ state, className, book, deleteBookClick, editBookClick }) {
  const history = useHistory();
  // * Remove book above and use the one below when testing the component
  if (!book) {
    book = {
      id: "jdsbjhbsdcjnscb",
      title: "Database Principles",
      isbn: "998844212133",
      modCode: "CSIS1664",
      price: "300.00",
      edition: "2nd",
      dateUploaded: "21 April 2021",
      authors: "Steven Morris, Peter Rob",
      frontCover: imgSrc,
    };
  }

  const book_details = {
    title: "Title",
    isbn: "ISBN",
    modCode: "Module Code",
    price: "Price",
    edition: "Edition",
    dateUploaded: "Date Uploaded",
    authors: "Author(s)",
  };

  // TODO: Need to finish this function and pass book ID in URL to chats page
  const handleBuyBookClick = () => {
    history.push("/chats?" + book?.id);
  };
  const editBookClicked = () => {
    editBookClick(book.id, book.title, book.price);
  };

  // First parameter of mbox.default is empty string to remove the icon
  const deleteBookClicked = () => {
    import("../../utils/popUp.js").then((mbox) =>
      mbox.default(
        "info",
        "Delete Book!",
        "Are you sure you want to delete this book?\nTitle: " + book?.title,
        () => deleteBookClick({ variables: { id: book?.id } })
      )
    );
  };

  const handleBookState = () => {
    switch (state) {
      case "home_book_result": {
        return (
          <>
            <span className="cartIconContainer" onClick={handleBuyBookClick}>
              <ShoppingCartIcon />
            </span>
          </>
        );
      }

      // TODO: Need to make it look nice for the approval part / Chats Book Component
      case "chats_book": {
        return (
          <>
            <span>pending approval</span>
          </>
        );
      }

      // This is about the book when it is in the library
      default: {
        return (
          <>
            <span className="editIconContainer" onClick={editBookClicked}>
              <PencilIcon />
            </span>

            <span className="deleteIconContainer" onClick={deleteBookClicked}>
              <DeleteIcon />
            </span>
          </>
        );
      }
    }
  };

  // TODO: Make this one component have different states.
  // 1. For when it is in the library or collection page
  // 2. For when it appears in the search result page
  // 3. For wehn it appears in the chats page

  // The below TODO: is complete... But still need to debug and see if it works
  // TODO: Add a book field to the Message table/collection in mongoDB
  //  --> It won't be a required field because not all messages carry a Book
  //  --> mongoDB will only carry a book's id.
  //  --> The GraphQl schema will have the whole Book as a non-required field

  // TODO: Add a isBought field on Book table/collection in mongoDB
  //  --> it should be required at all times

  // FIXME: Need to work with user variable to actually find ways of delealing
  //        with the different components of Book

  return (
    <div className="book">
      {/* Book body | part with image */}
      <div className="book__imageContainer">
        <img className="book__image" src={book?.frontCover} alt={book?.title} />
      </div>

      {/* Book footer | part with delete and edit button */}
      <div className="book__footer">
        <div className="book__footerLeft">
          <h4 className="title--light">{book?.title}</h4>
          <p>{"R" + book?.price}</p>
        </div>

        <div className="book__footerRight">{handleBookState()}</div>
      </div>

      {/* Book pop up details */}
      <div className={`book__details ${className && className}`}>
        <span className="book__detailsToggle">
          <InfoIcon className="infoIcon" />
        </span>

        <div className="book__detailsBody">
          {book &&
            Object.keys(book_details).map((key) => {
              if (book[key]) {
                return (
                  <span key={key}>
                    <p>
                      {book_details[key]}:{" "}
                      {key === "price" ? "R" + book[key] : book[key]}
                    </p>
                  </span>
                );
              }

              return "";
            })}
        </div>
      </div>
    </div>
  );
}

export default Book;
