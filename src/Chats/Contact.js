import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import "./Contact.css";

function Contact({ name }) {
  const openChats = () => {
    if (window.innerWidth <= 550) {
      const chats = document.querySelector(".chats__main");
      const chatsSidebar = document.querySelector(".chats__sidebar");

      chats.classList.contains("closing") && chats.classList.toggle("closing");
      chatsSidebar.classList.contains("fadeIn") &&
        chatsSidebar.classList.toggle("fadeIn");

      chats.classList.toggle("opening");
      chatsSidebar.classList.toggle("fadeOut");
    }
  };

  return (
    <div className="contact" onClick={openChats}>
      <span className="contact__iconContainer">
        <PersonIcon className="contact__icon" />
      </span>

      <span className="contact__name">{name}</span>
      <span className="contact__status"></span>
    </div>
  );
}

export default Contact;
