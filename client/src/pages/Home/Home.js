import React, { useEffect, useState } from "react";
// import PersonIcon from "../../account-home.png";
import PersonIcon from "@material-ui/icons/Person";
import MenuItem from "../../components/MenuItem/MenuItem.js";
import { Link } from "react-router-dom";
import logo from "../../logo.png";
import SearchResult from "../../components/SearchResult/SearchResult";
import { useUserHelpers } from "../../Redux/getSlices";
import { SearchOutlined } from "@material-ui/icons";
import "./Home.css";

//change the background reference here
var ref_link = 'https://500px.com/photo/294752081/Down-by-the-lakeside-by-S-Luciano-Fredheim';
var ref_name = "S. Luciano Fredheim";

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
      <div className="home__header">
       

        <div className="home__avatar" onClick={handleAvatarClick}>
          <PersonIcon className="avatarIcon"/>
          <div className="home__avatarName">{user?.firstName || "Guest"}</div>
        </div>
      </div>

      <div className="home__searchSection">
      <div className="home__logo">
          <img className="home__logoImg logo" src={logo} alt="qampus logo" />
        </div>
        <h4 className="home__title">Welcome</h4>
        <h3 className="home__title2">here you can sell your texbooks, or buy them from other students</h3>

        <p className="home__subtitle">Search for textbooks</p>

        <form className="home__searchContainer">
          <input type="text" name="searchBook" className="home__searchInput" placeholder="Type the title, ISBN or module code."/>
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
              subtitle="Upload your used textbooks and sell them to other students. "
            />{" "}
          </Link>

          <Link to="/collection">
            <MenuItem
              icon="collection"
              title="Book Collection"
              subtitle="Have a look at a collection of all the books that you've uploaded."
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
              subtitle="Find your way around campus with Qampus."
            />{" "}
          </Link>

          <Link to="/setting">
            <MenuItem
              icon="settings"
              title="Settings"
              subtitle="Change your profile preferences, etc."
            />{" "}
          </Link>
        </div>
      </div>

      <div
        className="home__searchResults"
        style={{ display: displays.results }}
      >
        <div className="heading">
          <h3>Search results</h3>
          <button className="btnBack" onClick={openMenu}>X{/*Close search results*/}</button>
        </div>
        {results?.map((_, i) => {
          return <SearchResult key={i} />;
        })}
      </div>

      <div className='reference'>
        <a className="reference_link" target="_blank" rel="noreferrer" href={ref_link}>Do you like this photo? <br/> [ by<u> {ref_name} </u>]</a>
      </div>

    </div>
  );
}

export default Home;
