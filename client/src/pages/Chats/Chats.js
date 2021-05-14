import React, { useState, useEffect, useLayoutEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import { Link, Redirect } from "react-router-dom";
import Contact from "../../components/Contact/Contact.js";
import Message from "../../components/Message/Message";
import { useMessagesHelpers, useUserHelpers } from "../../Redux/getSlices.js";
import "./Chats.css";

function Chats() {
  const [textMsg, setMsg] = useState("");
  const [height, setHeight] = useState(0); //Height given to the chats main and sidebar
  const [windowHeight, setWindowHeigt] = useState(window.innerHeight); //Keeps track of screen height
  const [messages, messageDispatch] = useMessagesHelpers();
  const [{ user }, userDispatch] = useUserHelpers();

  window.onresize = () => setWindowHeigt(window.innerHeight); //keeps track of changes in screen height

  const handleChange = (e) => setMsg(e.target.value);

  const showMsg = (e) => {
    e.preventDefault();
    console.log(e.preventDefault());

    const regex = / /gi;
    if (textMsg === "" || textMsg.replace(regex, "") === "") return;

    messageDispatch({
      payload: {
        text: textMsg,
        time: new Date().toLocaleTimeString(),
        sent: false,
      },
    });
    setMsg("");
  };

  const closeChats = () => {
    document.querySelector(".chats__main").classList.toggle("opening");
    document.querySelector(".chats__main").classList.toggle("closing");

    const chatsSidebar = document.querySelector(".chats__sidebar");
    chatsSidebar.classList.toggle("fadeOut");
    chatsSidebar.classList.toggle("fadeIn");
  };

  useLayoutEffect(() => {
    const header = document.querySelector(".app > .header");

    setHeight(windowHeight - header.clientHeight - 15);
  }, [setHeight, windowHeight]);

  useEffect(() => {
    document.title = "Qampus | Chats";
  }, []);

  // if (!user) {
  //   userDispatch({
  //     type: "SET_PATH",
  //     payload: "/chats",
  //   });
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="chats">
      <div className="chats__sidebar" style={{ height: height + "px" }}>
        <div className="chats__sidebarHeader">
          <h2 className="title">Chats {" | " + user?.firstName || ""}</h2>

          <span className="icon__container">
            <Link className="icon__containerLink" to="/">
              <ArrowBackIosIcon />
            </Link>
          </span>
        </div>

        <div className="chats__sidebarBody">
          <div className="search__container">
            <input className="search__input" placeholder="" />
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

      <div className="chats__main" style={{ height: height + "px" }}>
        <div className="chats__mainHeader">
          <div className="left" onClick={closeChats}>
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
          <form onSubmit={showMsg}>
            <button className="btnAttach">
              <i className="fas fa-paperclip"></i>
            </button>

            <button className="btnEmoji">
              <i className="fas fa-grin"></i>
            </button>

            <input
              placeholder=""
              className="sendMsgInput"
              onChange={handleChange}
              value={textMsg}
            />

            <button className="btnSend" type="submit">
              <i className="fas fa-paper-plane"></i>
            </button>

            <button className="btnRecord">
              <i className="fas fa-microphone"></i>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chats;
