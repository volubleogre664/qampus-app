import { useEffect, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { useMutation } from "@apollo/react-hooks";
import { SearchOutlined } from "@material-ui/icons";
import GridIcon from "@mui/icons-material/AppsRounded";
import CancelIcon from "@material-ui/icons/CloseRounded";
import MenuBookRoundedIcon from '@mui/icons-material/MenuBookRounded';
import ProfileIcon from "@mui/icons-material/ManageAccountsRounded";
import { Link } from "react-router-dom";
import MenuItem from "@components/MenuItem";
import Book from "@components/Book";
import Loader from "@components/Loader";
import popUpDialogue from "@utils/popUp.js";
import { SEARCH_BOOKS } from "@utils/graphql";
import HeaderMenu from "../../components/HeaderMenu";
import Recent from "../../components/RecentUploads";
import Request from "../../components/BookRequests";
import ComingSoon from "../../components/ComingSoon";
import DailyQoutes from "../../components/DailyQuotes";
import RecommendedReads from "../../components/RecommendedReads";
import {MdKeyboardArrowUp} from "react-icons/md";
import {
  useUserSlice,
  useBooksSlice,
  useMessagesSlice,
} from "@redux/getSlices";

import logo from "../../logo_grey.png";
import "./Home.css";

//change the background reference here
const ref_link = "https://www.smoorevisuals.com/landscapes/";
const ref_name = "Spencer Moore";

function Home({ history }) {
  const [{ user }, dispatchUser] = useUserSlice();
  const [{ searchBookList: books }, dispatchBook] = useBooksSlice();
  const [searchStr, setSearchStr] = useState("");
  const [loading, setLoading] = useState(false);
  const [, dispatchMessages] = useMessagesSlice();

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
    const menu = document.getElementById("login__menu");
    menu.classList.toggle("active");

    //hide the profile opion if user is not logged in
    //use profile flag to keep of track of clicks
    if (user && !profileFlag) {
      profileFlag = setProfileFlag(true);
      const profileItem = document.getElementsByClassName("profile_section");
      profileItem[0].classList.toggle("active");
    }
  };

  const handleLoginMenuClick = () => {
    if (user) {
      dispatchUser({
        type: "REMOVE_USER",
      });

      dispatchMessages({
        type: "CLEAR_MESSAGES",
      });
    }

    history.push("/login");
  };

  const handleCloseMenuClick = () => {
    const menu = document.getElementById("login__menu");
    menu.classList.toggle("active");
  };

  const handleProfileMenuClick = () => {
    history.push("/profile");
  };
  // Helps return back to the menu
  const openMenu = () => {
    setDisplays({ menu: "flex", results: "none" });
  };

  useEffect(() => {
    document.title = "Home";
  }, []);
  var [profileFlag, setProfileFlag] = useState(() => {
    if (!user) {
      return true;
    } else {
      return false;
    }
  });

  return (
    <div className="home">
      <a name="top"></a>
      <HeaderMenu/>

      {loading && <Loader message="Searching..." />}

      <div className="home__searchSection">
        <div className="home__logo">
          <img className="home__logoImg" src={logo} alt="qampus logo"/>
          <h1>Qampus</h1>
        </div>
        <p className="home__subtitle">Welcome, what book are you looking for?</p>

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
            placeholder="Search by ISBN, title, or module code."
          />

          <button type="submit">
            <SearchOutlined />
          </button>
        </form>
      </div>

     <div className="home__body" style={{ display: displays.menu }}>
        <div className="top__row">
          <DailyQoutes/>
          <Recent/>
        </div>
        <div className="bottom__row">
          {/* <ComingSoon/> */}
          <Request/>
          <RecommendedReads/>

        </div>
     </div>

      <div
        className="home__searchResults"
        style={{ display: displays.results }}
      >
        <div className="heading">
          <h3>Search results</h3>
          <div className="btnBack" onClick={openMenu}>
            <CancelIcon/>{/*Close search results*/}
          </div>
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

      {/* <a className="backToTop" href="#top"><MdKeyboardArrowUp/></a> */}
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
