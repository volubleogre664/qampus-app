import { useEffect, useState } from "react";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import CancelIcon from "@mui/icons-material/CloseRounded";
import Book from "@components/Book";
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

      dispatchBook({
        type: "SET_SEARCH_BOOK_LIST",
        payload: data.searchBook,
      });
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

  const searchValueChanged = (e) => {
    let searchText = e.target.value;

    setSearchStr(searchText);

    if (searchText.trim() === "") return;

    searchBook({ variables: { searchStr: searchText } });
  };

  // Handles click of search button
  const handleSearchClick = (e) => {
    e.preventDefault();

    dispatchBook({
      type: "SET_SEARCH_BOOK_LIST",
      payload: [],
    });

    // setLoading(true);

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
    if (searchStr === "" && !books.length) {
      searchBook({ variables: { searchStr } });
    }
  }, [searchStr, searchBook, books]);

  useEffect(() => {
    document.title = "Log In - Qampus";

    if (user !== null) return;

    if (isAuthenticated) localStorage.setItem("auth", "yes");
    else localStorage.setItem("auth", "no");

    let auth = localStorage.getItem("auth");

    if (auth && auth === "yes" && user === null) {
      getUserData({ variables: { email: authUser.email, password: "sdsds" } });
    }
  }, [getUserData, isAuthenticated, user, authUser]);

  return (
    <div className="home">
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
            onChange={searchValueChanged}
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
          <Recent books={books} searchText={searchStr} loading={loading} />
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
    </div>
  );
}

export default Home;
