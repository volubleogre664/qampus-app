import React from "react";
import PersonIcon from "@material-ui/icons/Person";
import "./Contact.css";

function Contact({name}) {
  return (
    <div className="contact">
      <span className="contact__iconContainer">
	<PersonIcon className="contact__icon" />
      </span>

      <span className="contact__name">{name}</span>
      <span className="contact__status"></span>
    </div>
  );
}

export default Contact;
