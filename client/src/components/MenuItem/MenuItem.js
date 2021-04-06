import React from "react";
import ChatIcon from "@material-ui/icons/ChatOutlined";
import SettingsIcon from "@material-ui/icons/SettingsOutlined";
import PublishIcon from "@material-ui/icons/PublishOutlined";
import LibraryBooksIcon from "@material-ui/icons/ClassOutlined";
import LocationOnIcon from "@material-ui/icons/LocationOnOutlined";
import ErrorIcon from "@material-ui/icons/Error";
import "./MenuItem.css";

function MenuItem({ icon, title, subtitle }) {
  const getIcon = (icon) => {
    switch (icon) {
      case "chats":
        return <ChatIcon />;
      case "settings":
        return <SettingsIcon />;
      case "navigation":
        return <LocationOnIcon />;
      case "upload":
        return <PublishIcon />;
      case "collection":
        return <LibraryBooksIcon />;
      default:
        return undefined;
    }
  };

  return (
    <div className="menuItem">
      <div className="menuItem__icon">{getIcon(icon) ?? <ErrorIcon />}</div>

      <div className="menuItem__title">{title}</div>

      <div className="menuItem__subtitle">{subtitle}</div>
    </div>
  );
}

export default MenuItem;
