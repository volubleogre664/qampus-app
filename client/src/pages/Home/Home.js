import React, { useEffect, useState } from "react";
import PersonIcon from "../../account-home.png";
import MenuItem from "../../components/MenuItem/MenuItem.js";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import SearchResult from "../../components/SearchResult/SearchResult";
import { useUserHelpers } from "../../Redux/getSlices";
import { SearchOutlined } from "@material-ui/icons";
import "./Home.css";

function Home({ history }) {
  const [results, setResults] = useState([]);
  const [{ user }] = useUserHelpers();
  // Toggles the results section and the menu section
  const [displays, setDisplays] = useState({
    menu: "flex",
    results: "none",
  });

  // Handles click of search button
  const handleSearchClick = (e) => {
    e.preventDefault();
    if (displays.menu !== "none") {
      setResults([...results, 1, 1]);
      setDisplays({ ...results, menu: "none", results: "flex" });
    }
  };

  const handleAvatarClick = (e) => {
    if (user) {
      history.push("/profile");
    } else {
      history.push("/login");
    }
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
      <div className="home__header">
        <div className="home__logo">
          <img className="home__logoImg logo" src={logo} alt="qampus logo" />
        </div>

        <div className="home__avatar" onClick={handleAvatarClick}>
          <div className="home__avatarIcon">
            <img className="avatarIcon" src={PersonIcon} alt="avatar_icon" />
          </div>

          <div className="home__avatarName">{user?.firstName || "Guest"}</div>
        </div>
      </div>

      <div className="home__searchSection">
        <h4 className="home__title">Search for textbooks</h4>

        <p className="home__subtitle">Type the ISBN, title or Module Code.</p>

        <form className="home__searchContainer">
          <input type="text" name="searchBook" className="home__searchInput" />
          <button type="submit" onClick={handleSearchClick}>
            <SearchOutlined />
          </button>
        </form>
      </div>

      <div className="home__menu" style={{ display: displays.menu }}>
        <div className="home__menuItems">
          <Link to="/upload">
            <MenuItem
              icon="upload"
              title="Upload"
              subtitle="Upload your used textbooks and sell them to other students."
            />{" "}
          </Link>

          <Link to="/collection">
            <MenuItem
              icon="collection"
              title="Book Collection"
              subtitle="Here you will find a collection of all the books you have uploaded."
            />{" "}
          </Link>

          <Link to="chats">
            <MenuItem
              icon="chats"
              title="Chats"
              subtitle="Connect with other students who are registered on Qampus."
            />{" "}
          </Link>

          <Link to="navigation">
            <MenuItem
              icon="navigation"
              title="Navigation"
              subtitle="Let Qampus Navigator help you find your way around your Campus."
            />{" "}
          </Link>

          <Link to="/setting">
            <MenuItem
              icon="settings"
              title="Settings"
              subtitle="Play around with Qampus settings and customise it to be you."
            />{" "}
          </Link>
        </div>
      </div>

      <div
        className="home__searchResults"
        style={{ display: displays.results }}
      >
        <div className="heading">
          <h3>Your search results are: </h3>
          <button onClick={openMenu}>Back</button>
        </div>

        {results?.map((_, i) => {
          return <SearchResult key={i} />;
        })}
      </div>
    </div>
  );
}

export default Home;
