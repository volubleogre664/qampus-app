import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import AttachmentIcon from "@material-ui/icons/Attachment";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import Contact from "./Contact.js";
import Message from "./Message.js";
import "./Chats.css";

function Chats() {
 return (
   <div className="chats">
     <div className="chats__sidebar">
       <div className="chats__sidebarHeader">
         <h2 className="title">Chats</h2>

	 <span className="icon__container">
           <ArrowBackIosIcon /> 
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
           Offline <br /> Last seen now
	 </div>
       </div>

       <div className="chats__mainBody">
         <Message 
           text="This is a dummy message placed here for front end testing so yeah mate lets see."
	   time="13:46"
	   state={true}
	 />

	 <Message 
           text="This is a second dummy message also aimed at texting."
	   time="13:14"
           state={false}
	 />
       </div>

       <div className="chats__mainFooter">
         <AttachmentIcon />

	 <EmojiEmotionsIcon />

	 <input placeholder="Type message..." className="sendMsgInput" />

	 <SendIcon />

	 <MicIcon />
       </div>
     </div>
   </div>
 );
}

export default Chats;
