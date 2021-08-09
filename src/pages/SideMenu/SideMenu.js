import { useState } from "react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import { Link } from "react-router-dom";

import "./SideMenu.css";

function SideMenu() {
  const [profile, setProfile] = useState(false);

  const profileClicked = (e) => {
    const pageProf = document.querySelector(".profile");
    if (!profile) {
      pageProf.classList.toggle("profile__showing");

      if (pageProf.classList.contains("profile__closing")) {
        pageProf.classList.toggle("profile__closing");
      }
    } else {
      pageProf.classList.toggle("profile__showing");
      pageProf.classList.toggle("profile__closing");
    }

    setProfile(!profile);
  };

  return (
    <div className="sideMenu">
      <header className="sideMenu__header">Options</header>

      <main className="sideMenu__main">
        <Link to="/">
          <HomeOutlinedIcon />
        </Link>
        <LocationOnIcon />
        <PersonOutlineOutlinedIcon onClick={profileClicked} />
        <InfoOutlinedIcon />
      </main>
    </div>
  );
}

export default SideMenu;
