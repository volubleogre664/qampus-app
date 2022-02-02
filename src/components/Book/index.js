import InfoIcon from "@material-ui/icons/InfoOutlined";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import PencilIcon from "@material-ui/icons/EditRounded";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useHistory } from "react-router-dom";

import popUpDialogue from "@utils/popUp.js";

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
      moduleCode: "CSIS1664",
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
    moduleCode: "Module Code",
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
    popUpDialogue({
      icon: "info",
      title: "Delete Book!",
      text: "Are you sure you want to delete this book?\nTitle: " + book?.title,
      callback: () => deleteBookClick({ variables: { id: book?.id } }),
    });
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
            <span></span>
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

  return (
    <div className="book">
      {/* Book body | part with image */}
      <div className="book__imageContainer">
        <img
          loading="eager"
          className="book__image"
          src={book?.frontCover}
          alt={book?.title}
        />
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
