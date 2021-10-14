import ChatIcon from "@material-ui/icons/ChatRounded";
import PublishIcon from "@material-ui/icons/PublishRounded";
import LibraryBooksIcon from "@material-ui/icons/BookRounded";
import LocationOnIcon from "@material-ui/icons/LocationOnRounded";
import ErrorIcon from "@material-ui/icons/Error";
import "./MenuItem.css";

function MenuItem({ icon, title, subtitle, path, guest, history }) {
  const getIcon = (icon) => {
    switch (icon) {
      case "chats":
        return <ChatIcon />;
      case "help":
        return <ErrorIcon />;
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
    <div
      className={`menuItem ${(guest === false && "guest__menuItem") || ""}`}
      onClick={() => history.push(path)}
    >
      <div className="menuItem__icon">{getIcon(icon) ?? <ErrorIcon />}</div>

      <div className="menuItem__title">{title}</div>
      <hr />
      <div className="menuItem__subtitle">{subtitle}</div>
    </div>
  );
}

export default MenuItem;
