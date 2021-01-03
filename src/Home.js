import React, {useState} from 'react';
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import PersonIcon from "@material-ui/icons/Person";
import MenuItem from "./MenuItem.js";
import './Home.css';

function Home() {
  return (
    <div className='home'>
      <div className="home__header">
        <div className="home__logo">
          <span className="home__logoName">Qampus</span><sup className="home__smallCaps">TM</sup>
	</div>

	<div className="home__avatar">
          <div className="home__avatarIcon">
            <PersonIcon />
	  </div>

	  <div className="home__avatarName">
	    Shabalala<br />Nduduzo
	  </div>
	</div>
      </div>

      <div className="home__searchSection">
        <h4 className="home__title">Search for textbooks</h4>
	
	<p className="home__subtitle">
          Type the ISBN, title or Module Code.
	</p>

        <div className="home__searchContainer">
          <input type="text" name="searchBook" className="home__searchInput" />

	  <SearchIcon />
        </div>
      </div>

      <div className="home__menu">
        <span className="home__arrowIcon">
	  <ArrowBackIcon />
	</span>

	<div className="home__menuItems">
          <MenuItem
            icon="upload"
	    title="Upload"
	    subtitle="Here you can upload books to sell to other learners"
	  />

	  <MenuItem
            icon="collection"
	    title="Collection"
	    subtitle="You can view the collection of books you have uploaded"
	  />
         
	  <Link to="/chats">
	  <MenuItem
	    icon="chat"
	    title="Chats"
	    subtitle="You can chat with people you've worked with before or jump into the QampusChatand chat with everyone."
	  /></Link>

	  <MenuItem
	    icon="navigation"
	    title="Navigation"
	    subtitle="Let Qampus Navigator help you find your way around your Campus."
	  />

	  <MenuItem
            icon="settings"
	    title="Settings"
	    subtitle="Play around with Qampus settings and customise it to be you."
	  />
	</div>

	<span className="home__arrowIcon">
          <ArrowForwardIcon />
	</span>
      </div>
    </div>
  );
}

export default Home;
