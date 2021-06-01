import { useState, useEffect, useLayoutEffect } from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import { Link, Redirect } from "react-router-dom";
import {
  useMutation,
  useLazyQuery,
  useSubscription,
} from "@apollo/react-hooks";

import Contact from "../../components/Contact/Contact.js";
import Message from "../../components/Message/Message";

import {
  ADD_MESSAGE,
  GET_MESSAGES_QUERY,
  MESSAGE_SUBSCRIPTION,
} from "../../utils/graphql";
import { useMessagesHelpers, useUserHelpers } from "../../Redux/getSlices.js";

import "./Chats.css";

function Chats() {
  const [textMsg, setMsg] = useState("");
  const [height, setHeight] = useState(0); //Height given to the chats main and sidebar
  const [windowHeight, setWindowHeigt] = useState(window.innerHeight); //Keeps track of screen height
  const [messages, messageDispatch] = useMessagesHelpers();
  const [currentContact, setCurrentContact] = useState({});
  const [{ user }, userDispatch] = useUserHelpers();

  window.onresize = () => setWindowHeigt(window.innerHeight); //keeps track of changes in screen height

  // Updates the textMsg hook
  const handleChange = (e) => setMsg(e.target.value);

  // Sends message to the server
  const [addMessage] = useMutation(ADD_MESSAGE, {
    varaibles: { to: currentContact?.studentNumber, textMsg: textMsg },
    update(_, { data: { addMessage: msg } }) {
      messageDispatch({
        payload: msg,
      });

      setMsg("");
    },
    onError(err) {
      console.log(err);
    },
  });

  // Get messages as you move between contacts
  const [getMessagesQuery] = useLazyQuery(GET_MESSAGES_QUERY, {
    variables: {
      to: currentContact?.studentNumber,
      from: user?.studentNumber,
      messagesLength: messages?.filter(
        (item) =>
          (item.from === user?.studentNumber &&
            item.to === currentContact?.studentNumber) ||
          (item.from === currentContact?.studentNumber &&
            item.to === user?.studentNumber)
      ).length,
    },
    onCompleted(data) {
      messageDispatch({
        payload: data?.getMessages,
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  // Listens for incoming messages and updates them in realtime
  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { to: user?.studentNumber },
    skip: !user,
    onSubscriptionData({
      subscriptionData: {
        data: { newMessage },
      },
    }) {
      messageDispatch({
        payload: newMessage,
      });
    },
  });

  // Handles clicking each contact
  const handleContactClick = (contact) => {
    // Handling the closing and opening of the chats main
    if (window.innerWidth <= 550) {
      const chats = document.querySelector(".chats__main");
      const chatsSidebar = document.querySelector(".chats__sidebar");

      chats.classList.contains("closing") && chats.classList.toggle("closing");
      chatsSidebar.classList.contains("fadeIn") &&
        chatsSidebar.classList.toggle("fadeIn");

      chats.classList.toggle("opening");
      chatsSidebar.classList.toggle("fadeOut");
    }

    // Get chats based on the currently selected contact
    setCurrentContact(contact);
    // callGetMessages();
  };

  // form submit method
  const onSubmit = (e) => {
    e.preventDefault();

    const regex = / /gi;
    if (textMsg === "" || textMsg.replace(regex, "") === "") return;

    addMessage({ variables: { to: currentContact?.studentNumber, textMsg } });
  };

  // close chats animation controller
  const closeChats = () => {
    document.querySelector(".chats__main").classList.toggle("opening");
    document.querySelector(".chats__main").classList.toggle("closing");

    const chatsSidebar = document.querySelector(".chats__sidebar");
    chatsSidebar.classList.toggle("fadeOut");
    chatsSidebar.classList.toggle("fadeIn");
  };

  // Fix inconsistent CSS with the sidebar and main heights
  useLayoutEffect(() => {
    const header = document.querySelector(".app > .header");

    setHeight(windowHeight - header.clientHeight - 15);
  }, [setHeight, windowHeight]);

  // Runs only once on component render and never runs again
  // Here we set currentContact to the first contact in your list and get the data
  useEffect(() => {
    document.title = "Qampus | Chats";

    if (!user) return;
    setCurrentContact(user.contacts[0]);
  }, [user, setCurrentContact]);

  // Runs on component render then again whenever currentContact changes.
  // Ensures the getting of message from database everytime you switch a contact
  useEffect(() => {
    if (Object.keys(currentContact).length) {
      getMessagesQuery({
        variables: {
          to: currentContact?.studentNumber,
          from: user?.studentNumber,
          messagesLength: messages.filter(
            (item) =>
              (item.from === user.studentNumber &&
                item.to === currentContact.studentNumber) ||
              (item.from === currentContact.studentNumber &&
                item.to === user.studentNumber)
          ).length,
        },
      });
    }
  }, [currentContact, getMessagesQuery, user, messages]);

<<<<<<< HEAD
  // if (!user) {
  //   userDispatch({
  //     type: "SET_PATH",
  //     payload: "/chats",
  //   });
  //   return <Redirect to="/login" />;
  // }
=======
  if (!user) {
    userDispatch({
      type: "SET_PATH",
      payload: document.location.pathname,
    });
    return <Redirect to="/login" />;
  }
>>>>>>> 8696acc175f2369b472a4b4bbf4b184b4d07b96f

  return (
    <div className="chats">
      {/* {loading && <Loader />} */}
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
            {user?.contacts &&
              user.contacts.map((contact) => (
                <Contact
                  onClick={() => handleContactClick(contact)}
                  key={contact.id}
                  contact={contact}
                />
              ))}
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
              {(currentContact?.picture && (
                <img
                  className
                  src={currentContact?.picture || ""}
                  alt={[
                    currentContact?.firstName,
                    currentContact?.lastName,
                  ].join(" ")}
                />
              )) || <PersonIcon />}
            </span>
            <span className="name">{currentContact?.firstName || "Elon"}</span>
          </div>

          <div className="right">
            <label className="online__status">Offline</label>
            <label className="last__seen">Last seen: Now</label>
          </div>
        </div>

        <div className="chats__mainBody">
          <Message
            from={user?.studentNumber}
            contact={currentContact.studentNumber}
            messages={messages}
          />
        </div>

        <div className="chats__mainFooter">
          <form onSubmit={onSubmit}>
            <button className="btnAttach">
              <i className="fas fa-paperclip"></i>
            </button>

            <button className="btnEmoji">
              <i className="fas fa-grin"></i>
            </button>

            <input
              placeholder=""
              className="sendMsgInput"
              value={textMsg}
              onChange={handleChange}
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
