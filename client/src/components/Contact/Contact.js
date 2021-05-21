import PersonIcon from "@material-ui/icons/Person";

import "./Contact.css";

function Contact({ contact, onClick }) {
  return (
    <div className="contact" onClick={onClick}>
      <span className="contact__iconContainer">
        {(contact?.profile && (
          <img
            className
            src={contact?.profile}
            alt={[contact?.firstName, contact?.lastName].join(" ")}
          />
        )) || <PersonIcon />}
      </span>

      <span className="contact__name">
        {[contact?.firstName, contact?.lastName].join(" ")}
      </span>
      <span className="contact__status"></span>
    </div>
  );
}

export default Contact;
