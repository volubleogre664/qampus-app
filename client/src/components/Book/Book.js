import InfoIcon from "@material-ui/icons/InfoOutlined";
import DeleteIcon from "@material-ui/icons/DeleteRounded";
import PencilIcon from "@material-ui/icons/EditRounded";

import imgSrc from "./img.jpg";

import "./Book.css";

function Book() {
  const book = {
    title: "Design Principles",
    isbn: "998844212133",
    modCode: "CSIS1664",
    price: "R300.00",
    edition: "2nd",
    dateUploaded: "21 April 2021",
    authors: "Steven Morris, Peter Rob",
  };

  const book_details = {
    title: "Title",
    isbn: "ISBN",
    modCode: "Module Code",
    price: "Price",
    edition: "Edition",
    dateUploaded: "Date Uploaded",
    authors: "Author(s)",
  };

  return (
    <div className="book">
      {/* Book body part with image */}
      <div className="book__imageContainer">
        <img className="book__image" src={imgSrc} alt="book title" />
      </div>

      {/* Book footer part with delete and edit button */}
      <div className="book__footer">
        <div className="book__footerLeft">
          <h1>{book.title}</h1>
          <span>{book.price}</span>
        </div>

        <div className="book__footerRight">
          <span className="editIconContainer">
            <PencilIcon />
          </span>

          <span className="deleteIconContainer">
            <DeleteIcon />
          </span>
        </div>
      </div>

      {/* Book pop up details */}
      <div className="book__details">
        <span className="book__detailsToggle">
          <InfoIcon />
        </span>

        <div className="book__detailsBody">
          {Object.keys(book).map((key) => {
            if (book[key]) {
              return (
                <span>
                  <strong>{book_details[key]}:</strong> {book[key]}
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
