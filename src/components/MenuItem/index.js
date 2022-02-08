import ChatIcon from "@mui/icons-material/ChatRounded";
import PublishIcon from "@mui/icons-material/PublishRounded";
import BookIcon from "@mui/icons-material/BookRounded";
import LocationOnIcon from "@mui/icons-material/LocationOnRounded";
import ErrorIcon from "@mui/icons-material/Error";
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
        return <BookIcon />;
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
