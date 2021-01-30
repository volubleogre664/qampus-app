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
            <AttachmentIcon />

            <EmojiEmotionsIcon />

            <input placeholder="Type message..." className="sendMsgInput" onChange={handleChange} />

            <button type="submit" onClick={showMsg}>
              <SendIcon />
            </button>

            <MicIcon />
          </form>
        </div>
      </div>
    </div>
 );
}

export default Chats;
