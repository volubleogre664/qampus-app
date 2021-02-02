import React, {useState} from 'react';
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon  from "@material-ui/icons/ArrowForward";
import PersonIcon from "../account-home.png";
//import PersonIcon from "@material-ui/icons/Person";
import MenuItem from "./MenuItem.js";
import {Link} from "react-router-dom";
import logo from "../logo.png";
import searchIcon from "../searchIcon.png";
import './Home.css';

function Home() {
  return (
	
<div className='home'>
	
    <div className="home__header">
        <div className="home__logo">
          <img className="home__logoImg" src={logo} alt="qampus logo" />
		</div>

		<div className="home__avatar">
          	<div className="home__avatarIcon">
				<img class="avatarIcon" src={PersonIcon} alt="avatar_icon" />
	  		</div>

	  		<div className="home__avatarName">
		  		Guest
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
			<img class="searchButton" src={searchIcon} alt="search_icon" />
        </div>
    </div>

    <div className="home__menu">
        <span className="home__arrowIcon">
	  		<ArrowBackIcon/>
		</span>

		<div className="home__menuItems">
          	<MenuItem
		    class="upload"
			icon="upload"
	    	title="Upload"
	    	subtitle="Upload your used textbooks and sell them to other students."
	 		/>

		   <MenuItem
		  	class="collection"
            icon="collection"
	    	title="Book Collection"
	    	subtitle="Here you will find a collection of all the books you have uploaded."
	  		/>

	  		<MenuItem
			class="chat"
			icon="chat"
			title="Chats"
			subtitle="Connect with other students who are registered on Qampus."
			/> 

			<MenuItem
			class="navigation"
			icon="navigation"
			title="Navigation"
			subtitle="Let Qampus Navigator help you find your way around your Campus."
			/>
	
	  		<MenuItem
			class="settings"
			icon="settings"
			title="Settings"
			subtitle="Play around with Qampus settings and customise it to be you."
			/>

			<span className="home__arrowIcon">
          		<ArrowForwardIcon />
			</span>
      	</div>
    </div>

</div>
  );
}

export default Home;
