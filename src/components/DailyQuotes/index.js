import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded';
import "./Quotes.css";

function DailyQoutes() {
    return (
        <div className="daily__qoutes">
        <p className="caption">Daily quotes</p>
        <ul className="home__list">
          <li><FormatQuoteRoundedIcon className="list__icon"/><p> The meaning of life is to give life meaning.<br/>
          - Viktor Frankl</p></li>
          <li><FormatQuoteRoundedIcon className="list__icon"/><p>To be trusted is a greater compliment than being loved.<br/>
            - George Mcdonald</p></li>
        </ul>
      </div>
    );
  }
  
  export default DailyQoutes;