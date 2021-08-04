import { useState, useEffect, useLayoutEffect } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
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
  GET_USER_DATA,
} from "../../utils/graphql";
import {
  useBooksHelpers,
  useMessagesHelpers,
  useUserHelpers,
} from "../../Redux/getSlices.js";

import "./Chats.css";

function Chats() {
  const [textMsg, setMsg] = useState("");
  const [height, setHeight] = useState(0); //Height given to the chats main and sidebar
  const [windowHeight, setWindowHeigt] = useState(window.innerHeight); //Keeps track of screen height
  const [messages, messageDispatch] = useMessagesHelpers();
  const [currentContact, setCurrentContact] = useState(null);
  const [{ user }, userDispatch] = useUserHelpers();
  const [{ searchBookList }] = useBooksHelpers();
  const [book, setBook] = useState({});

  window.onresize = () => setWindowHeigt(window.innerHeight); //keeps track of changes in screen height

  // Updates the textMsg hook
  const handleChange = (e) => setMsg(e.target.value);

  // Sends message to the server
  const [addMessage] = useMutation(ADD_MESSAGE, {
    varaibles: { to: currentContact?.id, textMsg: textMsg },
    update(_, { data: { addMessage: msg } }) {
      // if (window.location.search.length) window.location.search = "";
      if (!messages.find((m) => m.id === msg.id)) {
        messageDispatch({
          payload: msg,
        });
      }

      setMsg("");
    },
    onError(err) {
      console.log(err);
    },
  });

  // * Getting user data from data base after buying the book from them
  // * This is part of preparing of sending the book
  const [getUserData] = useLazyQuery(GET_USER_DATA, {
    onCompleted(data) {
      let userData = user?.contacts?.find(
        (item) => item?.studentNumber === book.bookOwner
      );

      if (!userData && data.getUserData) {
        userData = data.getUserData;
        userDispatch({
          type: "ADD_USER_CONTACT",
          payload: userData,
        });
      }

      if (userData.id) {
        setCurrentContact(userData);
        handleContactClick(userData);
        addMessage({
          variables: {
            to: userData?.id,
            textMsg: `Hi ${userData?.firstName} I would like to purchase this book`,
            book: book.bookId,
          },
        });
      }
    },
    onError(err) {
      console.log(err.message);
    },
  });

  // Get messages as you move between contacts
  const [getMessagesQuery] = useLazyQuery(GET_MESSAGES_QUERY, {
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
    variables: { to: user?.id },
    skip: !user,
    onSubscriptionData({
      subscriptionData: {
        data: { newMessage },
      },
    }) {
      console.log(newMessage);
      messageDispatch({
        payload: newMessage,
      });
    },
  });

  // Handles clicking each contact
  const handleContactClick = (contact) => {
    // Change the current selected contact
    setCurrentContact(contact);

    // Handling the closing and opening of the chats main
    if (window.innerWidth <= 550) {
      document.querySelector(".chats__sidebar").classList.toggle("fadeOut");
      document.querySelector(".chats__main").classList.toggle("opening");
    }

    // Get messages for the newly selected contact
    // messagesLength ensures that the current number of messages between user and current contact
    //  -> equals the one in the database.
    getMessagesQuery({
      variables: {
        to: contact?.id,
        from: user?.id,
        messagesLength: messages?.filter(
          (item) =>
            (item?.from === user?.id && item?.to === contact?.id) ||
            (item?.from === contact?.id && item?.to === user?.id)
        ).length,
      },
    });
  };

  // form submit method
  // Runs when sending the messages
  const onSubmit = (e) => {
    e.preventDefault();

    const regex = / /gi;
    if (textMsg === "" || textMsg.replace(regex, "") === "") return;

    addMessage({ variables: { to: currentContact?.id, textMsg } });
  };

  // For closing the chats
  const closeChats = () => {
    if (window.innerWidth > 550) return;

    document.querySelector(".chats__main").classList.toggle("opening");
    document.querySelector(".chats__sidebar").classList.toggle("fadeOut");
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

    if (!user || !user?.contacts?.length) return;
    setCurrentContact(user.contacts[0]);
  }, [user, setCurrentContact]);

  // Runs once on component render
  // Ensures that when chats open we get the messages for the first contact in your list
  useEffect(() => {
    if (user && user?.contacts?.length && !window.location.search) {
      getMessagesQuery({
        variables: {
          to: currentContact?.id,
          from: user?.id,
          messagesLength: messages?.filter(
            (item) =>
              (item?.from === user?.id && item?.to === currentContact?.id) ||
              (item?.from === currentContact?.id && item?.to === user?.id)
          ).length,
        },
      });
    }
  }, [getMessagesQuery, user, messages, currentContact?.id]);

  // Runs only when someone clicked a book to buy
  // Thats why there's an early return
  useEffect(() => {
    if (!window.location.search) {
      return;
    }

    const bookId = window.location.search.substring(1);

    const bookOwner = searchBookList.find(
      (item) => item.id === bookId
    )?.studentNumber;

    setBook({
      bookId,
      bookOwner,
    });

    getUserData({ variables: { studentNumber: bookOwner } });
  }, [searchBookList, setBook, getUserData, user]);

  return (
    <div className="chats">
      <aside className="chats__sidebar" style={{ height: height + "px" }}>
        <div className="chats__sidebarHeader">
          <p>Your chats</p>
          <br />
        </div>

        <div className="chats__sidebarBody">
          <div className="search__container">
            <input className="search__input" placeholder="" />
            <SearchIcon />
          </div>

          <div className="contactSection">
            {user?.contacts &&
              user.contacts.map((contact, i) => (
                <Contact
                  onClick={() => handleContactClick(contact)}
                  key={contact?.id + i}
                  contact={contact}
                />
              ))}
          </div>
        </div>

        <div className="chats__sidebarFooter">
          <span className="text">Find a study buddy</span>
          <ArrowForwardIosIcon />
        </div>
      </aside>

      <main className="chats__main" style={{ height: height + "px" }}>
        <header className="chats__mainHeader">
          <div className="left" onClick={closeChats}>
            <span className="iconContainer">
              {(currentContact?.picture && (
                <img
                  className="iconContainer__image"
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
        </header>

        <div className="chats__mainBody">
          {messages
            .filter(
              (msg) =>
                (msg.from === user?.id && msg.to === currentContact?.id) ||
                (msg.from === currentContact?.id && msg.to === user?.id)
            )
            .map((msg) => (
              <Message key={msg?.id} from={user?.id} msg={msg} />
            ))}
        </div>

        <footer className="chats__mainFooter">
          <form onSubmit={onSubmit}>
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
          </form>
        </footer>
      </main>
    </div>
  );
}

export default Chats;
