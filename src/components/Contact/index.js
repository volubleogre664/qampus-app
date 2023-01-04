import { useEffect, useState, useRef } from "react";

import personIcon from "@assets/profile.png";
import { getTime } from "@utils/helperFunctions";

import "./Contact.css";

function Contact({ contact, onClick, lastMsg: { lastMsg, time }, current }) {
  const ref = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // let activeMenu = document.querySelector(".contact.contact__menuActive");
    // if (activeMenu) activeMenu.classList.remove("contact__menuActive");

    setMenuPosition({ x: e.clientX, y: e.clientY });

    setShowMenu(true);
  };

  const handleLeftClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowMenu(false);
    onClick(e);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowMenu, ref]);

  return (
    <div
      className={`contact ${current?.id === contact.id && "currentContact"} ${
        showMenu && "contact__menuActive"
      }`}
      ref={ref}
      onClick={handleLeftClick}
      // onContextMenuCapture={handleRightClick}
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

      {/* This will be the right-click contextmenu popup */}
      <div
        className="contact__menu"
        style={{ left: menuPosition.x, top: menuPosition.y }}
      >
        <button className="contact__menuButton">Delete</button>
        <button className="contact__menuButton">Block</button>
        <button className="contact__menuButton">Report</button>
      </div>
    </div>
  );
}

export default Contact;
