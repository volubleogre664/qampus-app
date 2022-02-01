import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import HailRoundedIcon from '@mui/icons-material/HailRounded';
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded';
import "./ComingSoon.css";

function Coming() {
    return(
        <div className="coming__soon">
        <p className="caption">Coming soon</p>
          <ul className="home__list">
            <li><PhoneIphoneRoundedIcon className="list__icon"/><p>Mobile app for iOS and Android devices.</p></li>
            <li><HailRoundedIcon className="list__icon"/><p>A new feature that will transform the way you travel.</p></li>
            <li><ShoppingBagRoundedIcon className="list__icon"/><p>The perfect platform to sell everything.</p></li>
          </ul>
      </div>
    );
}

export default Coming;