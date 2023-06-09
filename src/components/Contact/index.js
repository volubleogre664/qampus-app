import dayjs from "dayjs";
import personIcon from "@assets/profile.png";
import { getTime } from "@utils/helperFunctions";

import "./Contact.css";

function Contact({ contact, onClick, lastMsg: { lastMsg, time }, current }) {
  return (
    <div
      className={`contact ${current?.id === contact.id && "currentContact"}`}
      onClick={onClick}
    >
      <span className="contact__iconContainer">
        <img
          className="contact__icon"
          loading="eager"
          src={contact?.picture?.length > 0 ? contact?.picture : personIcon}
          alt={[contact.firstName, contact.lastName].join(" ")}
        />
      </span>

      <div className="contact__body">
        <span className="contact__name">
          {[contact?.firstName, contact?.lastName].join(" ")}
        </span>
        {/* Each contact's last message here mate */}
        <span className="contact__lastMsg">{lastMsg || ""}</span>
      </div>
      <span className="contact__lastMsgTime">{getTime(time)}</span>
    </div>
  );
}

export default Contact;