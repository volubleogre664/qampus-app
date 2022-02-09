import { useState } from "react";
import Book from "@components/Book";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { SEARCH_BOOKS } from "@utils/graphql";
import { useMutation } from "@apollo/react-hooks";
import { useBooksSlice } from "@redux/getSlices";
import "./RecentUpload.css";

function Recent({ history }) {
  const [{ searchBookList: books }, dispatchBook] = useBooksSlice();
  const [loading, setLoading] = useState(false);
  const [searchStr] = useState("");

  const [searchBook] = useMutation(SEARCH_BOOKS, {
    variables: { searchStr },
    onCompleted(data) {
      setLoading(!loading);
      data?.searchBook.forEach((book) =>
        dispatchBook({
          type: "SET_SEARCH_BOOK_LIST",
          payload: book,
        })
      );
    },
  });

  searchBook();

  // Handles click of search button
  const handlerRefreshClick = (e) => {
    e.preventDefault();
    // Search for books in the database
    searchBook();
  };

  return (
    <div className="recent__uploads">
      <div className="card__header">
        <p className="caption">Recent uploads</p>
        <AddRoundedIcon id="upload" className="card__header__icon" />
        <RefreshRoundedIcon
          onClick={handlerRefreshClick}
          className="card__header__icon"
        />
      </div>
      <div className="home__books">
        {books.map((book) => (
          <Book
            key={book?.id}
            state="home_book_result"
            book={book}
            history={history}
          />
        ))}
      </div>
    </div>
  );
}

export default Recent;
