import { useEffect, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { SearchOutlined } from "@material-ui/icons";

import MenuItem from "../../components/MenuItem/MenuItem";
import Book from "../../components/Book/Book.js";
import Loader from "../../components/Loader/Loader";

import { useUserHelpers, useBooksHelpers } from "../../Redux/getSlices";
import { GET_BOOK_TITLES, GET_ONE_BOOK } from "../../utils/graphql";

import logo from "../../logo.png";

// import isValidISBN from "../../utils/validate.js";

import "./Home.css";

//change the background reference here
const ref_link =
  "https://500px.com/photo/294752081/Down-by-the-lakeside-by-S-Luciano-Fredheim";
const ref_name = "S. Luciano Fredheim";

function Home({ history }) {
  const [{ user }] = useUserHelpers();
  const [, dispatchBook] = useBooksHelpers();
  const [results, setResults] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [book, setBook] = useState({});
  const [bookTitles, setBookTitles] = useState(null);
  const [loading, setLoading] = useState(true);

  // Toggles the results section and the menu section
  const [displays, setDisplays] = useState({
    menu: "flex",
    results: "none",
  });

  // Get the titles of books from mongoDB
  useQuery(GET_BOOK_TITLES, {
    onCompleted(data) {
      setBookTitles(data?.getBookTitles);
      setLoading(false);
    },
    onError(err) {
      console.log(err);
      setLoading(false);
    },
  });

  // Getting one book from database
  const [getOneBook] = useLazyQuery(GET_ONE_BOOK, {
    onCompleted(data) {
      setBook(data?.getBook);
      dispatchBook({
        type: "SET_SEARCH_BOOK_LIST",
        payload: data?.getBook,
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  // Handles click of search button
  const handleSearchClick = (e) => {
    e.preventDefault();
    if (displays.menu !== "none") {
      setResults([...results, 1, 1]);
      setDisplays({ ...results, menu: "none", results: "flex" });
    }

    const bookId = bookTitles.filter((item) => item.title === searchStr)[0].id;

    // console.log(bookId);

    getOneBook({ variables: { bookId } });
  };

  const handleAvatarClick = () => {
    history.push("/profile");
  };

  // Helps retturn back to the menu
  const openMenu = () => {
    setDisplays({ menu: "flex", results: "none" });
    setResults([]);
  };

  useEffect(() => {
    document.title = "Qampus | Home";
  }, []);

  return (
    <div className="home">
      {loading && <Loader message="Getting books" />}
      <div className="home__header">
        <div className="home__avatar" onClick={handleAvatarClick}>
          <PersonIcon className="avatarIcon" />
          <div className="home__avatarName">{user?.firstName || "Guest"}</div>
        </div>
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

          {/* Use the book titles for auto complete here */}
          <datalist id="home__books">
            {!loading &&
              bookTitles.map((item) => (
                <option key={item.id} value={item.title} />
              ))}
          </datalist>

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
            path="/settings"
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
        {/* TODO: Still working on the book stuff mate */}

        {Object.values(book).length && (
          <Book state="home_book_result" book={book} history={history} />
        )}
        {/* {results?.map((_, i) => {
          return <Book history={history} key={i} />;
        })} */}
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
