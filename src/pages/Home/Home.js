import { useEffect, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CancelIcon from "@mui/icons-material/CloseRounded";
import Book from "@components/Book";
import Loader from "@components/Loader";
import { SEARCH_BOOKS } from "@utils/graphql";
import Recent from "@components/RecentUploads";
import DailyQoutes from "@components/DailyQuotes";
import RecommendedReads from "@components/RecommendedReads";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useBooksSlice } from "@redux/getSlices";
import "./Home.css";

//change the background reference here
// const ref_link = "https://www.smoorevisuals.com/landscapes/";
// const ref_name = "Spencer Moore";

function Home({ history }) {
  const [{ searchBookList: books }, dispatchBook] = useBooksSlice();
  const [searchStr, setSearchStr] = useState("");
  const [loading, setLoading] = useState(false);

  // Toggles the results section and the menu section
  const [displays, setDisplays] = useState({
    menu: "flex",
    results: "none",
  });

  const [searchBook] = useMutation(SEARCH_BOOKS, {
    variables: { searchStr },
    onCompleted(data) {
      setLoading(false);
      console.log(data);
      dispatchBook({
        type: "SET_SEARCH_BOOK_LIST",
        payload: data?.searchBook,
      });
    },
    onError: (err) => {
      setLoading(false);
      console.log("Error getting books");
      // TODO: Show a pop up message to tell the user the problem
    },
  });

  // Handles click of search button
  const handleSearchClick = (e) => {
    e.preventDefault();

    dispatchBook({
      type: "SET_SEARCH_BOOK_LIST",
      payload: [],
    });

    setLoading(true);

    if (displays.menu !== "none") {
      setDisplays({ menu: "none", results: "flex" });
    }

    // Search for books in the database
    searchBook({ variables: { searchStr } });
  };

  // Helps return back to the menu
  const openMenu = () => {
    setDisplays({ menu: "flex", results: "none" });
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div className="home">
      {loading && <Loader message="Searching..." />}

      <div className="home__searchSection" id="search">
        <p className="home__subtitle">
          Welcome, what book are you looking for?
        </p>

        <form
          autoComplete="off"
          className="home__searchContainer"
          onSubmit={handleSearchClick}
        >
          <input
            type="text"
            name="searchBook"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            className="home__searchInput"
            list="home__books"
            placeholder="ISBN, title, or module code."
          />

          <button type="submit">
            {/* <a name="top"></a> */}
            <SearchOutlined />
          </button>
        </form>
      </div>

      <div className="home__body" style={{ display: displays.menu }}>
        <div className="top__row">
          <Recent />
        </div>
        <div className="bottom__row">
          {/* <ComingSoon/> */}
          {/* <DailyQoutes /> */}
          {/* <Request/> */}
          {/* <RecommendedReads /> */}
        </div>
      </div>

      <div
        className="home__searchResults"
        style={{ display: displays.results }}
      >
        <div className="heading">
          <h3 className="caption">Search results</h3>
          <div className="btnBack" onClick={openMenu}>
            <CancelIcon />
          </div>
        </div>

        <div className="results">
          {books?.map((book) => (
            <Book
              key={book?.id}
              state="home_book_result"
              book={book}
              history={history}
            />
          ))}
        </div>
      </div>

      <a className="backToTop" href="#search">
        <MdKeyboardArrowUp />
      </a>
      {/* <div className="reference">
        <a
          className="reference_link"
          target="_blank"
          rel="noreferrer"
          href={ref_link}
        >
          Do you like this photo? <br /> [ by<u> {ref_name} </u>]
        </a>
      </div> */}
    </div>
  );
}

export default Home;
