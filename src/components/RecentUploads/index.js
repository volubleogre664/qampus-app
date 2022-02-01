import Book from "@components/Book";
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import "./RecentUpload.css";

function Recent() {
  return (<div className="recent__uploads">
        <div className="card__header">
            <p className="caption">Recent uploads</p>
            <RefreshRoundedIcon className="card__header__icon"/>
        </div>
        <div className="home__books">
            <Book/>
            <Book/>
            <Book/>
            <Book/>
            <Book/>
            <Book/>
            <Book/>
        </div>
    </div>
  );
}

export default Recent;
