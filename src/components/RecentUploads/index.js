import Book from "@components/Book";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { Link } from "react-router-dom";
import "./RecentUpload.css";

function Recent({ books, searchText, loading }) {
  return (
    <div className="recent__uploads">
      <header className="card__header">
        <p className="caption">
          {(searchText && "Search results for: " + searchText) ||
            "Recent uploads"}
        </p>
        <Link className="nav__linksItem__link" to="/collection">
          <AddRoundedIcon id="upload" className="card__header__icon" />
          <span>Uplaod book</span>
        </Link>

        {/* <RefreshRoundedIcon className="card__header__icon" /> */}
      </header>

      <div className="home__books">
        {books.map((book) => (
          <Book key={book?.id} state="home_book_result" book={book} />
        ))}
      </div>
    </div>
  );
}

export default Recent;
