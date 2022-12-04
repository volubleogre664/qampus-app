import React, { useState, useRef, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import EmojiIcon from "@mui/icons-material/EmojiEmotions";
import BackIcon from "@mui/icons-material/ArrowBack";
import useGQL from "../../utils/graphqlHooks";
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
import ChatSearchResult from "@components/ChatSearchResult";
import { GET_ALL_USER_MESSAGES } from "../../utils/graphql";

function Chats() {
  const [{ user }, userDispatch] = useUserSlice();
  const [textMsg, setMsg] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState({ contacts: [], chats: [] });
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
  const [addMessage] = useGQL({
    type: "mutation",
    query: ADD_MESSAGE,
    varaibles: { to: currentContact?.id, textMsg: textMsg },
    onSuccess: (_, { data: { addMessage: msg } }) => {
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
    onError: (err) => {},
  });

  // Gets all chats that include the user (Whether they were the receiver or the sender)
  const [getAllChats] = useLazyQuery(GET_ALL_USER_MESSAGES, {
    onCompleted({ getAllUserMessages: userChats }) {
      messageDispatch({
        payload: userChats,
      });
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
            from: user?.id,
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

  const handleSearchChatClick = (item) => {
    let contact = user.contacts.find((contact) => contact.id === item.from);

    if (!contact) {
      return;
    }

    handleContactClick(contact);

    document.getElementById(item.id).scrollIntoView();
  };

  // Search for messages and contacts based on the search input
  const handleSearch = (e) => {
    setSearchText(e.target.value.toLowerCase());
    let search = e.target.value.toLowerCase();

    if (!search.length) {
      setSearchData({ contacts: [], chats: [] });
      return;
    }

    // Get all chats comming from others and get all the contacts as well
    // Search through the contacts first then the chats
    // The ui must be separated into two sections, one for contacts and one for chats
    // Clicking on a contact will show the chats between the user and the contact
    // Clicking message will show the message in the main section

    let contacts = user?.contacts?.filter((item) => {
      let name = item.firstName + item.lastName;
      return name.toLowerCase().includes(search);
    });

    let chats = messages
      .filter((item) => item.from !== user.id)
      .filter((item) => {
        return item.textMsg.toLowerCase().includes(search);
      });

    // TODO: To be continued
    const data = {};

    data.contacts = contacts.map((item) => {
      return {
        contact: item,
        onClick: () => handleContactClick(item),
        lastMsg: getLastMsg(item.id),
      };
    });

    data.chats = chats.map((item) => {
      let from = user.contacts.find((con) => con.id === item.from);

      return {
        name: [from.firstName, from.lastName].join(" "),
        textMsg: item.textMsg,
        id: item.id,
        time: item.time,
        onClick: () => handleSearchChatClick(item),
      };
    });

    setSearchData({
      ...searchData,
      contacts: data.contacts,
      chats: data.chats,
    });
  };

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
    if (textMsg === "" || textMsg.replace(regex, "") === "") {
    }

    addMessage({
      variables: { to: currentContact?.id, textMsg, from: user.id },
    });

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

  // Runs when chats open the first time to download them
  useEffect(() => {
    if (messages.length !== 0) return;

    getAllChats({ variables: { userId: user.id } });
  }, [messages, user.id, getAllChats]);

  function getLastMsg(contact) {
    for (let i = messages.length - 1; i > 0; i--) {
      if (
        (user.id === messages[i].from && contact === messages[i].to) ||
        contact === messages[i].from
      ) {
        return {
          lastMsg: messages[i].textMsg,
          time: messages[i].time,
        };
      }
    }

    return { lastMsg: null, time: null };
  }

  return (
    <section className="chats">
      <header className="chats__header">
        {!chatClick && (
          <div className="searchContainer active">
            {searchText.length > 0 ? (
              <BackIcon
                role="button"
                onClick={() => {
                  setSearchText("");
                  setSearchData({ contacts: [], chats: [] });
                }}
              />
            ) : (
              <SearchIcon />
            )}
            <input
              onChange={handleSearch}
              value={searchText}
              placeholder="Search..."
              type="text"
            />
          </div>
        )}

        <div className={`chats__headerProfile ${chatClick && "chatsOpen"}`}>
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
          {(searchText.length > 0 && (
            <ChatSearchResult data={searchData} />
          )) || (
            <div className="contactsContainer">
              {user?.contacts &&
                user.contacts.map((contact, i) => (
                  <Contact
                    onClick={() => handleContactClick(contact)}
                    key={contact?.id + i}
                    contact={contact}
                    lastMsg={getLastMsg(contact.id)}
                    current={currentContact}
                  />
                ))}
            </div>
          )}
        </aside>

        <main className={`chats__mainSection ${chatClick && "chatsOpen"}`}>
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
