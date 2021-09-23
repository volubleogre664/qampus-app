import ChatIcon from "@material-ui/icons/ChatRounded";
import PublishIcon from "@material-ui/icons/PublishRounded";
import LibraryBooksIcon from "@material-ui/icons/ClassRounded";
import LocationOnIcon from "@material-ui/icons/LocationOnRounded";
import ErrorIcon from "@material-ui/icons/Error";
import { useUserSlice} from "../../Redux/getSlices";
import "./MenuItem.css";



function MenuItem({ icon, title, subtitle, path, history }) {
  const [{ user }, dispatchUser] = useUserSlice();
  const getIcon = (icon) => {
    switch (icon) {
      case "chats":
        return <ChatIcon style={{color:getColor()}}/>;
      case "help":
        return <ErrorIcon />;
      case "navigation":
        return <LocationOnIcon />;
      case "upload":
        return <PublishIcon style={{color:getColor()}}/>;
      case "collection":
        return <LibraryBooksIcon style={{color:getColor()}}/>;
      default:
        return undefined;
    }
  }; 
  const getColor = () => {
    if(user == null)
    return "grey";
  } 
  return (
    <div className="menuItem" onClick={() => history.push(path)}>
      <div className="menuItem__icon" >{getIcon(icon) ?? <ErrorIcon />}</div>

      <div className="menuItem__title">{title}</div>

      <div className="menuItem__subtitle">{subtitle}</div>
    </div>
  );

}

export default MenuItem;
