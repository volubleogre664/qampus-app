import { PieChart } from "react-minimal-pie-chart";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import "./Request.css";

function Requests() {
  return (
    <div className="book__requests">
      <div className="card__header">
        <p className="caption">Book requests</p>
        <AddRoundedIcon className="card__header__icon" />
      </div>
      <div className="home__graph">
        <ul className="home__list">
          <li>
            <BarChartRoundedIcon className="first__icon" />
            <p>Information Systems in a Business Environment</p>
          </li>
          <li>
            <BarChartRoundedIcon className="second__icon" />
            <p>Business Functions</p>
          </li>
          <li>
            <BarChartRoundedIcon className="third__icon" />
            <p>Digital Marketing</p>
          </li>
          <li>
            <BarChartRoundedIcon className="fourth__icon" />
            <p>Other</p>
          </li>
        </ul>
        <PieChart
          data={[
            { title: "First", value: 45, color: "#2e4682" },
            { title: "Two", value: 25, color: "#627fac" },
            { title: "Three", value: 20, color: "#8ebdf8" },
            { title: "Other", value: 10, color: "#b3daff" },
          ]}
          className="book__chart"
        />
      </div>
    </div>
  );
}

export default Requests;
