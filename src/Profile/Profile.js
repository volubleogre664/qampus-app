import React from "react";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import img from "./Dinesh.jpg";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <header className="profile__header">
        <h2 className="profile__headerTitle">
          Your Profile: 
	</h2>

        <div className="profile__headerImgContainer">
	  <img 
            className="profile__headerImg"
	    src={img}
	    alt="user profile picture"
	  />
	  <CameraAltIcon />
	</div>	
      </header>

      <main className="profile__main">
        <div className="profile__mainName">
          <section>
            <p className="title">Name: </p>
	    <div contenteditable className="nameContainer">
              Dinesh 
	    </div>
	  </section>
	  <CreateOutlinedIcon />
	</div>

	<div className="profile__mainStudy">
          <section>
            <p className="title">Field of Study: </p>
	    <div contenteditable className="studyContainer">
              Computer Science 
	    </div>
	  </section>

	  <CreateOutlinedIcon />
	</div>

	<div className="profile__mainBio">
          <section>
            <p className="title">Bio: </p>
	    <div contenteditable className="bioContainer">
              I am a web developer at Nuclear Software (Pty) Ltd. I do both frontend and backend development.
	    </div>
	  </section>

	  <CreateOutlinedIcon />
	</div>
      </main>
    </div>
  );
}

export default Profile;
