import { useEffect, useState } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CancelIcon from "@mui/icons-material/CloseRounded";
import Book from "@components/Book";
import Loader from "@components/Loader";
import { SEARCH_BOOKS } from "@utils/graphql";
import Recent from "@components/RecentUploads";
import { LOGIN_USER } from "@utils/graphql.js";
import useGQL from "../../utils/graphqlHooks";
import { useAuth0 } from "@auth0/auth0-react";
import { MdKeyboardArrowUp } from "react-icons/md";
import { useBooksSlice, useUtilsSlice, useUserSlice } from "@redux/getSlices";
import "./Home.css";

function Home({ history }) {
  const [{ searchBookList: books }, dispatchBook] = useBooksSlice();
  const [, dispatchUtils] = useUtilsSlice();
  const [{ user }, userDispatch] = useUserSlice();
  const [searchStr, setSearchStr] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, user: authUser } = useAuth0();

  // Toggles the results section and the menu section
  const [displays, setDisplays] = useState({
    menu: "flex",
    results: "none",
  });

  const [getUserData] = useGQL({
    type: "mutation",
    query: LOGIN_USER,
    onSuccess: (_, { data: { login: userData } }) => {
      setLoading(false);

      userDispatch({
        type: "SET_USER",
        payload: { ...userData },
      });
    },
    onError: (err) => {
      console.log(err);
      setLoading(false);
    },
  });

  const [searchBook] = useGQL({
    type: "mutation",
    query: SEARCH_BOOKS,
    variables: { searchStr },
    onSuccess(_, { data }) {
      setLoading(false);

      // Show the book results screen or component
      if (data.searchBook.length !== 0 && displays.menu !== "none") {
        setDisplays({ menu: "none", results: "flex" });
      }

      dispatchBook({
        type: "SET_SEARCH_BOOK_LIST",
        payload: data.searchBook,
      });

      if (data.searchBook.length === 0) {
        dispatchUtils({
          type: "DELETE_BOOK",
          payload: {
            title: "Book Not Found",
            subtitle:
              "We could not find the book you are looking for. The book might not be available or you can try to edit your search input.",
            btnCancel: false,
            btnContinue: true,
            bookTitle: "",
            popupShow: true,
          },
        });
      }
    },
    onError: (err) => {
      setLoading(false);
      dispatchUtils({
        type: "DELETE_BOOK",
        payload: {
          title: "Error Searching For Books",
          subtitle:
            "An error occured while trying to find your book, please try again later.",
          btnCancel: false,
          btnContinue: true,
          bookTitle: "",
          popupShow: true,
        },
      });
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

    // Search for books in the database
    searchBook({ variables: { searchStr } });
  };

  // Helps return back to the menu
  const openMenu = () => {
    setDisplays({ menu: "flex", results: "none" });
  };

  useEffect(() => {
    document.title = "Qampus";
  });

  useEffect(() => {
    document.title = "Log In - Qampus";

    if (user !== null) return;

    if (isAuthenticated) localStorage.setItem("auth", "yes");

    let auth = localStorage.getItem("auth");

    if (auth && auth === "yes" && user === null) {
      getUserData({ variables: { email: authUser.email, password: "sdsds" } });
    }
  }, [getUserData, isAuthenticated, user, authUser]);

  return (
    <div className="home">
      {loading && <Loader message="Searching..." />}

      <div className="home__searchSection" id="search">
        <p className="home__subtitle">What book are you looking for?</p>

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
            placeholder="Search by title or ISBN"
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
