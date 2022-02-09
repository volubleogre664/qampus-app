import AutoStoriesRoundedIcon from "@mui/icons-material/BookmarkOutlined";
import "./RecommendedReads.css";

function RecommendedReads() {
  return (
    <div className="recommended__reads">
      <p className="caption">Recommended reads</p>
      <ul className="home__list">
        <li>
          <AutoStoriesRoundedIcon className="list__icon" />
          <p>
            The 80/20 Principle: The Secret of Achieving More With Less
            <br /> by Richard Koch
          </p>
        </li>
        <li>
          <AutoStoriesRoundedIcon className="list__icon" />
          <p>
            The Art of Creative Thinking: How to Be Innovative and Develop Great
            Ideas
            <br /> by John Adair
          </p>
        </li>
        <li>
          <AutoStoriesRoundedIcon className="list__icon" />
          <p>
            The Psychology of Money: Timeless lessons on wealth, greed, and
            happiness <br /> by Morgan Housel
          </p>
        </li>
      </ul>
    </div>
  );
}

export default RecommendedReads;
