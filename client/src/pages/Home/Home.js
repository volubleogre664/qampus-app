import { useEffect, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { useMutation } from "@apollo/react-hooks";
import { SearchOutlined } from "@material-ui/icons";
import MenuItem from "../../components/MenuItem/MenuItem";
import Book from "../../components/Book/Book.js";
import Loader from "../../components/Loader/Loader";
import {
  useUserHelpers,
  useBooksHelpers,
  useMessagesHelpers,
} from "../../Redux/getSlices";
import { SEARCH_BOOKS } from "../../utils/graphql";
import logo from "../../logo.png";

import "./Home.css";

//change the background reference here
const ref_link = "https://www.smoorevisuals.com/landscapes/";
const ref_name = "Spencer Moore";

function Home({ history }) {
  const [{ user }, dispatchUser] = useUserHelpers();
  const [{ searchBookList: books }, dispatchBook] = useBooksHelpers();
  const [searchStr, setSearchStr] = useState("");
  const [loading, setLoading] = useState(false);
  const [, dispatchMessages] = useMessagesHelpers();

  // Toggles the results section and the menu section
  const [displays, setDisplays] = useState({
    menu: "flex",
    results: "none",
  });

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

  // Handles click of search button
  const handleSearchClick = (e) => {
    e.preventDefault();

    setLoading(!loading);

    if (displays.menu !== "none") {
      setDisplays({ menu: "none", results: "flex" });
    }

    // Search for books in the database
    searchBook();
  };

  // Clicking the avatar calls the method
  const handleAvatarClick = () => {
    if (!user) {
      history.push("/login");
    } else {
      import("../../utils/popUp.js").then((mbox) =>
        mbox.default(
          "",
          "Logging out!",
          "Are you sure you want to logout?",
          () => {
            dispatchUser({
              type: "REMOVE_USER",
            });

            dispatchMessages({
              type: "CLEAR_MESSAGES",
            });
          }
        )
      );
    }
  };

  // Helps return back to the menu
  const openMenu = () => {
    setDisplays({ menu: "flex", results: "none" });
  };

  useEffect(() => {
    document.title = "Home - Qampus";
  }, []);

  console.log(books);

  return (
    <div className="home">
      {loading && <Loader message="Getting books" />}
      <div className="home__header">
        <button className="home__avatar" onClick={handleAvatarClick}>
          <PersonIcon className="avatarIcon" />
          <span className="home__avatarName">{user?.firstName || "Guest"}</span>
        </button>
      </div>

      <div className="home__searchSection">
        <div className="home__logo">
          <img className="home__logoImg logo" src={logo} alt="qampus logo" />
        </div>
        <h4 className="home__title">Welcome</h4>
        <h3 className="home__title2">
          here you can sell your texbooks, or buy them from other students
        </h3>

        <p className="home__subtitle">Search for textbooks</p>

        <form className="home__searchContainer" onSubmit={handleSearchClick}>
          <input
            type="text"
            name="searchBook"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            className="home__searchInput"
            list="home__books"
            placeholder="Type the title, ISBN or module code."
          />

          <button type="submit">
            <SearchOutlined />
          </button>
        </form>
      </div>

      <div className="home__menu" style={{ display: displays.menu }}>
        <div className="home__menuItems">
          <MenuItem
            history={history}
            path="/upload"
            icon="upload"
            title="Upload"
            subtitle="Upload your used textbooks and sell them to other students. "
          />

          <MenuItem
            history={history}
            path="/collection"
            icon="collection"
            title="Book Collection"
            subtitle="Have a look at a collection of all the books that you've uploaded."
          />

          <MenuItem
            history={history}
            path="/chats"
            icon="chats"
            title="Chats"
            subtitle="Connect with other students who are registered on Qampus."
          />

          <MenuItem
            history={history}
            path="/navigation"
            icon="navigation"
            title="Navigation"
            subtitle="Find your way around campus with Qampus."
          />

          <MenuItem
            history={history}
            path="/profile"
            icon="settings"
            title="Settings"
            subtitle="Change your profile preferences, etc."
          />
        </div>
      </div>

      <div
        className="home__searchResults"
        style={{ display: displays.results }}
      >
        <div className="heading">
          <h3>Search results</h3>
          <button className="btnBack" onClick={openMenu}>
            X{/*Close search results*/}
          </button>
        </div>

        <div className="results">
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

      <div className="reference">
        <a
          className="reference_link"
          target="_blank"
          rel="noreferrer"
          href={ref_link}
        >
          Do you like this photo? <br /> [ by<u> {ref_name} </u>]
        </a>
      </div>
    </div>
  );
}

export default Home;
