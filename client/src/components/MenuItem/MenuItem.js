import ChatIcon from "@material-ui/icons/ChatRounded";
import SettingsIcon from "@material-ui/icons/SettingsRounded";
import PublishIcon from "@material-ui/icons/PublishRounded";
import LibraryBooksIcon from "@material-ui/icons/ClassRounded";
import LocationOnIcon from "@material-ui/icons/LocationOnRounded";
import ErrorIcon from "@material-ui/icons/Error";

import "./MenuItem.css";

function MenuItem({ icon, title, subtitle, path, history }) {
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
    <div className="menuItem" onClick={() => history.push(path)}>
      <div className="menuItem__icon">{getIcon(icon) ?? <ErrorIcon />}</div>

      <div className="menuItem__title">{title}</div>

      <div className="menuItem__subtitle">{subtitle}</div>
    </div>
  );
}

export default MenuItem;
