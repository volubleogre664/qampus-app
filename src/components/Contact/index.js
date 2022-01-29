import { useState } from "react";
import dayjs from "dayjs";
import personIcon from "./profile.png";

import "./Contact.css";

function Contact({ contact, onClick, lastMsg: { lastMsg, time }, current }) {
  const getTime = (time) => {
    const d = dayjs(Date.now());
    let daysDifference = d.diff(dayjs(time).format("YYYY-MM-DD"), "day");

    if (daysDifference === 1) {
      return "yesterday";
    } else if (daysDifference > 7) {
      return dayjs(time).format("DD/MM/YYYY");
    } else if (daysDifference > 1) {
      return dayjs(time).format("ddd");
    } else {
      return dayjs(time).format("HH:MM");
    }
  };

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
