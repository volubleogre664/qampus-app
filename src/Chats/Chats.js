import React, {useState} from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import AttachmentIcon from "@material-ui/icons/Attachment";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import {Link} from "react-router-dom";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import Contact from "./Contact.js";
import Message from "./Message.js";
import "./Chats.css";

function Chats() {
 const [textMsg, setMsg] = useState("");
 const [messages, setMsgs] = useState([]);

 const handleChange = (e) => setMsg(e.target.value);

 const showMsg = (e) => {
   e.preventDefault();
   const regex = / /gi;
   const str = textMsg.replace(regex, "");
   if (textMsg === "" || str === "") return;
   
   setMsgs([...messages, textMsg]);
   setMsg("");
   document.querySelector(".sendMsgInput").value = ""; 
 }

  return (
    <body>
    <div className="nav__section">
    <img className="nav__logo" src="../logo.png"></img>
    <nav>
    <ul class="nav_links">
    <li className="link__home"><a href="/">Home</a></li>
    <li><a href="#">Upload</a></li>
    <li><a href="#">Book Collection</a></li>
    <li className="link__chat"><a href="./Chats">Chats</a></li>
    <li><a href="#">Navigation</a></li>
    <li><a href="#">Settings</a></li>
    <li><a href="#">Help</a></li>
    <li><a href="#">Profile</a></li>
    <li><a href="./Login">Logout</a></li>
    </ul>
    </nav>
    </div>
    <div className="chats">
    
      <div className="chats__sidebar">
        <div className="chats__sidebarHeader">
          <h2 className="title">Chats</h2>

          <span className="icon__container">
            <Link className="icon__containerLink" to="/"> 
            <ArrowBackIosIcon />
            </Link>
          </span>
        </div>

        <div className="chats__sidebarBody">
          <div className="search__container">
            <input className="search__input" placeholder="Search chats..." />
	          <SearchIcon />
	        </div>

          <div className="contactSection">
            <Contact name="James King" />
	          <Contact name="Mason Monroe" />
	        </div>

        </div>

        <div className="chats__sidebarFooter">
          <span className="text">Find a study buddy</span>
      	  <ArrowForwardIosIcon />
        </div>

      </div>

      <div className="chats__main">
        <div className="chats__mainHeader">
          <div className="left">
            <span className="iconContainer">
              <PersonIcon />
            </span>
            <span className="name">Elon</span>
          </div>

          <div className="right">
          <label className="online__status">Offline</label>
          <label className="last__seen">Last seen: Now</label>
          </div>
        </div>

        <div className="chats__mainBody">
          <Message messages={messages} />
        </div>

        <div className="chats__mainFooter">
          <form>
            
            <button className="btnAttach">
              <AttachmentIcon />
            </button>

            <button className="btnEmoji">
              <EmojiEmotionsIcon />
            </button>


            <input placeholder="Type message..." className="sendMsgInput" onChange={handleChange} />

            <button className="btnSend" type="submit" onClick={showMsg}>
              <SendIcon />
            </button>

            <button className="btnRecord">
              <MicIcon />
            </button>

          </form>
        </div>
      </div>
    </div>
    </body>
 );
}

export default Chats;
