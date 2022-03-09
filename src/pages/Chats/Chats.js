import React, { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
// import AttachIcon from "@mui/icons-material/AttachFile";
import EmojiIcon from "@mui/icons-material/EmojiEmotions";
import BackIcon from "@mui/icons-material/ArrowBack";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import Picker from "emoji-picker-react";
import personIcon from "@assets/profile.png";
import Contact from "@components/Contact";
import { ADD_MESSAGE, GET_MESSAGES_QUERY, GET_USER_DATA } from "@utils/graphql";
import {
  useUserSlice,
  useMessagesSlice,
  useBooksSlice,
} from "@redux/getSlices.js";
import "./Chats.css";
import Message from "@components/Message";

function Chats() {
  const [{ user }, userDispatch] = useUserSlice();
  const [textMsg, setMsg] = useState("");
  const [messages, messageDispatch] = useMessagesSlice();
  const [currentContact, setCurrentContact] = useState(null);
  const [{ searchBookList }] = useBooksSlice();
  const [book, setBook] = useState({});
  const [emoji, setEmoji] = useState(false);
  const [chatClick, setChatClick] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const inputRef = useRef(null);
  // const attachRef = useRef(null);

  window.onresize = () => {
    setScreenWidth(window.innerWidth);
    if (window.innerWidth > 670) setChatClick(false);
  };

  // Updates the textMsg hook
  const handleChange = (e) => setMsg(e.target.value);

  // Allows emoji to be inserted in any position
  const handleEmojiClick = (_, emojiObj) => {
    inputRef.current.focus();

    let index = inputRef.current.selectionStart;
    let length = inputRef.current.value.length;

    if (index === 0) {
      setMsg(emojiObj.emoji + textMsg);
    } else if (index === length) {
      setMsg(textMsg + emojiObj.emoji);
    } else {
      setMsg(textMsg.substr(0, index) + emojiObj.emoji + textMsg.substr(index));
    }
  };

  // Sends message to the server
  const [addMessage] = useMutation(ADD_MESSAGE, {
    varaibles: { to: currentContact?.id, textMsg: textMsg },
    update(_, { data: { addMessage: msg } }) {
      // if (window.location.search.length) window.location.search = "";
      if (!messages.find((m) => m.id === msg.id)) {
        messageDispatch({
          payload: msg,
        });

        let chatsDiv = document.querySelector(".chats__mainBody");
        chatsDiv.scrollTop = chatsDiv.scrollHeight;
      }

      setMsg("");
    },
    onError(err) {},
  });

  // * Getting user data from data base after buying the book from them
  // * This is part of preparing of sending the book
  const [getUserData] = useLazyQuery(GET_USER_DATA, {
    onCompleted(data) {
      let userData = user?.contacts?.find(
        (item) => item?.id === book.bookOwner
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
    onError(err) {},
  });

  // Get messages as you move between contacts
  const [getMessagesQuery] = useLazyQuery(GET_MESSAGES_QUERY, {
    onCompleted(data) {
      data.getMessages.forEach((item) => {
        if (!messages.find((msg) => msg.id === item.id)) {
          messageDispatch({
            payload: item,
          });

          let chatsDiv = document.querySelector(".chats__mainSectionBody");
          chatsDiv.scrollTop = chatsDiv.scrollHeight;
        }
      });
    },
    onError(err) {},
  });

  // Handles clicking each contact
  const handleContactClick = (contact) => {
    if (screenWidth < 670) {
      setChatClick(!chatClick);
    }

    // Change the current selected contact
    setCurrentContact(contact);

    let filteredMsgs = messages?.filter(
      (item) =>
        (item?.from === user?.id && item?.to === contact?.id) ||
        (item?.from === contact?.id && item?.to === user?.id)
    ).length;

    if (!filteredMsgs) filteredMsgs = 0;

    // Get messages for the newly selected contact
    // messagesLength ensures that the current number of messages between user and current contact
    //  -> equals the one in the database.
    getMessagesQuery({
      variables: {
        to: contact?.id,
        from: user?.id,
        messagesLength: filteredMsgs,
      },
    });
  };

  // form submit method
  // Runs when sending the messages
  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const regex = / /gi;
    if (textMsg === "" || textMsg.replace(regex, "") === "") return;

    addMessage({ variables: { to: currentContact?.id, textMsg } });

    setMsg("");
  };

  // For closing the chats
  const closeChats = () => {
    if (screenWidth < 670) setChatClick(!chatClick);
  };

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
      let filteredMsgs = messages?.filter(
        (item) =>
          (item?.from === user?.id && item?.to === currentContact?.id) ||
          (item?.from === currentContact?.id && item?.to === user?.id)
      ).length;

      if (!filteredMsgs) return;

      getMessagesQuery({
        variables: {
          to: currentContact?.id,
          from: user?.id,
          messagesLength: filteredMsgs,
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
    )?.bookOwner;

    setBook({
      bookId,
      bookOwner,
    });

    getUserData({ variables: { id: bookOwner } });

    // return () => (window.location.href = "chats");
  }, [searchBookList, setBook, getUserData, user]);

  // TODO: HANDLE ATTACHMENT
  // const handleAttachment = (e) => {
  //   const file = e.target.files[0];
  //   // todo: Send file to server
  // };

  const getLastMsg = (contact) => {
    for (let i = messages.length - 1; i > 0; i--) {
      if (
        (user.id === messages[i].from && contact.id === messages[i].to) ||
        contact.id === messages[i].from
      ) {
        return {
          lastMsg: messages[i].textMsg,
          time: messages[i].time,
        };
      }
    }

    return { lastMsg: null, time: null };
  };

  return (
    <section className="chats">
      <header className="chats__header">
        {!chatClick && (
          <div className="searchContainer">
            <SearchIcon /> <input placeholder="Search..." type="text" />
          </div>
        )}

        <div className={`${chatClick && "chatsOpen"}`}>
          <button onClick={() => closeChats()}>
            {screenWidth < 670 && <BackIcon />}
            {currentContact && (
              <span className="contact__iconContainer">
                <img
                  className="contact__icon"
                  loading="eager"
                  src={
                    currentContact?.picture?.length > 0
                      ? currentContact?.picture
                      : personIcon
                  }
                  alt={[
                    currentContact?.firstName,
                    currentContact?.lastName,
                  ].join(" ")}
                />
              </span>
            )}
          </button>

          <p>
            {[currentContact?.firstName, currentContact?.lastName].join(" ")}
          </p>
        </div>
      </header>
      <section className="chats__main">
        <aside className="chats__mainAside">
          {/* <div className="searchContainer">
            <SearchIcon />{" "} 
            <input placeholder="Search for contact" type="text" />
          </div> */}

          <div className="contactsContainer">
            {user?.contacts &&
              user.contacts.map((contact, i) => (
                <Contact
                  onClick={() => handleContactClick(contact)}
                  key={contact?.id + i}
                  contact={contact}
                  lastMsg={getLastMsg(contact)}
                  current={currentContact}
                />
              ))}
          </div>
        </aside>

        <main className={`chats__mainSection ${chatClick && "chatsOpen"}`}>
          {/* <header className="chats__mainSectionHeader">Main Header</header> */}
          <main className="chats__mainSectionBody">
            {messages
              .filter(
                (msg) =>
                  (msg.from === user?.id && msg.to === currentContact?.id) ||
                  (msg.from === currentContact?.id && msg.to === user?.id)
              )
              .map((msg) => (
                <Message key={msg?.id} from={user?.id} msg={msg} />
              ))}
          </main>

          <footer className="chats__mainSectionFooter">
            {emoji && (
              <Picker
                onEmojiClick={(_, emojiObj) => handleEmojiClick(_, emojiObj)}
                pickerStyle={{ width: "100%" }}
              />
            )}
            <div>
              <form className="msgInputContainer" onSubmit={onSubmit}>
                <button
                  type="button"
                  onClick={() => setEmoji(!emoji)}
                  className="emojiIcon"
                >
                  <EmojiIcon />
                </button>
                <input
                  placeholder="Type a message"
                  onChange={handleChange}
                  ref={inputRef}
                  value={textMsg}
                  type="text"
                />
                {/* <button ref={attachRef} className="attachIcon">
                  <AttachIcon />
                </button> */}

                <button type="submit" className="sendIcon">
                  <SendIcon />
                </button>
              </form>
            </div>
          </footer>
        </main>
      </section>
    </section>
  );
}

export default Chats;
