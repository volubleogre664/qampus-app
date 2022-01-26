import { useEffect, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { useMutation } from "@apollo/react-hooks";
import { SearchOutlined } from "@material-ui/icons";
import LogoutIcon from "@mui/icons-material/LogoutRounded";
import LoginIcon from "@mui/icons-material/LoginRounded";
import GridIcon from "@mui/icons-material/AppsRounded";
import CancelIcon from "@material-ui/icons/CloseRounded";
import ProfileIcon from "@mui/icons-material/ManageAccountsRounded";
import { Link } from "react-router-dom";
import MenuItem from "@components/MenuItem";
import Book from "@components/Book";
import Loader from "@components/Loader";
import popUpDialogue from "@utils/popUp.js";
import { SEARCH_BOOKS } from "@utils/graphql";
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
    document.title = "Home - Qampus";
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
      {loading && <Loader message="Searching..." />}
      <div className="home__header">
        <div className="home__links">
          <Link href="/navigation">Navigation</Link>
          <Link href="/upload">Upload</Link>
        </div>
        <div className="home__grid">
          <GridIcon />
        </div>
        <button
          id="avatar"
          className="home__avatar"
          onClick={handleAvatarClick}
        >
          <div className="avatarIcon__container">
            {(user && user?.picture && (
              <img
                loading="eager"
                className="avatarIcon"
                alt={`${user.firstName} ${user.lastName}`}
                src={user.picture}
              />
            )) || <PersonIcon className="avatarIcon"/>}
          </div>
          <span className="home__avatarName">
            {user?.firstName[0] + user?.lastName[0] || "Guest"}
          </span>
        </button >

        <button
           id="login"
           className="home__login"
           onClick={handleLoginMenuClick}
        >
          {user ? <LogoutIcon /> : <LoginIcon />}
          {user ? "Sign out" : "Sign in"}
        </button>

        {/* <div id="login__menu">
          <section
            onClick={handleProfileMenuClick}
          >
            <ProfileIcon /> Profile
          </section>
          <section
            id="menu_item"
            className="login_section"
            onClick={handleLoginMenuClick}
          >
            {user ? <LogoutIcon /> : <LoginIcon />}
            {user ? "Sign out" : "Sign in"}
          </section>
          <hr />
          <section
            id="menu_item"
            className="close_section"
            onClick={handleCloseMenuClick}
          >
            <CancelIcon /> Close
          </section>
        </div> */}
      </div>

      <div className="home__searchSection">
        <div className="home__logo">
          <img className="home__logoImg" src={logo} alt="qampus logo"/>
          <h1>Qampus</h1>
        </div>
        <h4 className="home__title">Welcome</h4>
        <h3 className="home__title2">
          here you can sell your texbooks, or buy them from other students
        </h3>

        <p className="home__subtitle">Search for books</p>

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
            placeholder="Title, ISBN, module code."
          />

          <button type="submit">
            <SearchOutlined />
          </button>
        </form>
      </div>

      <div className="home__menu" style={{ display: displays.menu }}>
        <div className="home__menuItems">
          <MenuItem
            guest={user !== null ? true : false}
            history={history}
            path="/upload"
            icon="upload"
            title="Upload Books"
            subtitle="Sell your books to other students."
          />

          <MenuItem
            guest={user !== null ? true : false}
            history={history}
            path="/collection"
            icon="collection"
            title="My Books"
            subtitle="Keep track of your uploads."
          />

          <MenuItem
            guest={user !== null ? true : false}
            history={history}
            path="/chats"
            icon="chats"
            title="Chats"
            subtitle="Connect with buyers and sellers."
          />

          <MenuItem
            history={history}
            path="/navigation"
            icon="navigation"
            title="Qampus Navigation"
            subtitle="Find your way around campus."
          />

          <MenuItem
            history={history}
            path="/help"
            icon="help"
            title="Help"
            subtitle="About us, tutortials and more."
          />
        </div>
      </div>
      
      <div className="recent__uploads">
        <p className="title">Recent uploads</p>
        <div className="home__books">
          <Book/>
          <Book/>
          <Book/>
          <Book/>
          <Book/>
          <Book/>
          <Book/>
          <Book/>
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
