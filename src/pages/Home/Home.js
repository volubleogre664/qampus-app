import { useEffect, useState } from "react";
import PersonIcon from "@material-ui/icons/Person";
import { useMutation } from "@apollo/react-hooks";
import { SearchOutlined } from "@material-ui/icons";
import MenuItem from "../../components/MenuItem/MenuItem";
import Book from "../../components/Book/Book.js";
import Loader from "../../components/Loader/Loader";
import LogoutIcon from '@mui/icons-material/LogoutRounded';
import LoginIcon from '@mui/icons-material/LoginRounded';
import CancelIcon from '@material-ui/icons/CloseRounded';
import ProfileIcon from '@mui/icons-material/ManageAccountsRounded';
import {
  useUserSlice,
  useBooksSlice,
  useMessagesSlice,
} from "../../Redux/getSlices";
import { SEARCH_BOOKS } from "../../utils/graphql";
import logo from "../../logo.png";
import "./Home.css";

//change the background reference here
const ref_link = "https://www.smoorevisuals.com/landscapes/";
const ref_name = "Spencer Moore";
var profileFlag = 0;

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
    const menu = document.getElementById("login__menu")
    menu.focus();
    menu.classList.toggle("active");

    //hide the profile opion if user is not logged in
    //use profile flag to keep of track of clicks
    if (user != null  && profileFlag == 0) {
      const profileItem = document.getElementsByClassName("profile_section")
      profileItem[0].classList.toggle("active");  
      profileFlag = 1;
    }
  };

  const handleLoginMenuClick = () => {
    if (!user) {
      history.push("/login");
    } else {
      import("../../utils/popUp.js").then((mbox) =>
        mbox.default({
          title: "Logging out!",
          text: "Are you sure you want to logout?",
          callback: () => {
            dispatchUser({
              type: "REMOVE_USER",
            });

            dispatchMessages({ 
              type: "CLEAR_MESSAGES",
            });

            profileFlag = 0;
          },
        })
      );
    }
  }
  const handleCloseMenuClick = () => {
    const menu = document.getElementById("login__menu")
    menu.classList.toggle("active");
  };
  const handleProfileMenuClick = () => {
    history.push("/profile")
  };
  // Helps return back to the menu
  const openMenu = () => {
    setDisplays({ menu: "flex", results: "none" });
  };

  useEffect(() => {
    document.title = "Home - Qampus";
  }, []);

  return (
    <div className="home">
      {loading && <Loader message="Getting books" />}
      <div className="home__header">
        <button id="avatar" className="home__avatar" onClick={handleAvatarClick}>
          <div className="avatarIcon__container">
            {(user && user?.picture && (
              <img
                loading="eager"
                className="avatarIcon"
                alt={`${user.firstName} ${user.lastName}`}
                src={user.picture}
              />
            )) || <PersonIcon className="avatarIcon" />}
          </div>
          <span className="home__avatarName">{user?.firstName[0] + user?.lastName[0] || "Guest"}</span>
        </button>

        <div id="login__menu">
          <section id="menu_item" className="profile_section" onClick={handleProfileMenuClick}>
          <ProfileIcon/> Profile
          </section>
          <section id="menu_item" className="login_section" onClick={handleLoginMenuClick}>
            <LoginIcon/> Login
          </section>
          <hr/>
          <section id="menu_item" className="close_section" onClick={handleCloseMenuClick}>
            <CancelIcon/> Close
          </section>
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

        <p className="home__subtitle">Search for books</p>

        <form className="home__searchContainer" onSubmit={handleSearchClick}>
          <input
            type="text"
            name="searchBook"
            value={searchStr}
            onChange={(e) => setSearchStr(e.target.value)}
            className="home__searchInput"
            list="home__books"
            placeholder="Title, ISBN or Module Code."
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
            path="/help"
            icon="help"
            title="Help"
            subtitle="About us, saftey tips, tutorials and terms of use."
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
