import React from "react";
import ChatIcon from "@material-ui/icons/Chat";
import SettingsIcon from "@material-ui/icons/Settings";
import PublishIcon from "@material-ui/icons/Publish";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import ErrorIcon from "@material-ui/icons/Error";
import "./MenuItem.css";

function MenuItem({icon, title, subtitle}) {
  const getIcon = (icon) => {
    switch(icon) {
      case "chat": return <ChatIcon />;
      case "settings": return <SettingsIcon />;
      case "navigation": return <LocationOnIcon />;
      case "upload": return <PublishIcon />;
      case "collection": return <LibraryBooksIcon />;
      default: return undefined;
    }
  }

  return(
    <div className="menuItem">
      <div className="menuItem__icon">
	{getIcon(icon) ?? <ErrorIcon />}
      </div>

      <div className="menuItem__title">
	{title}
      </div>

      <div className="menuItem__subtitle">
        {subtitle}
      </div>
    </div>
  );
}

export default MenuItem;
