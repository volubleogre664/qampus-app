import { Redirect } from "react-router-dom";

import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { useUserHelpers } from "../../Redux/getSlices";

import "./Profile.css";

function Profile() {
  const [{ user }, dispatch] = useUserHelpers();

  // if (!user) {
  //   dispatch({
  //     type: "SET_PATH",
  //     payload: "/profile",
  //   });
  //   return <Redirect to="/login" />;
  // }

  return (
    <div className="profile">
      <header className="profile_header">
        <h1 className="title">Your Profile</h1>
        <hr className="separator"/>
      </header>

      <section className="profile__body">
        <aside className="profile__bodyAside">
          <ProfileImage title="Your Profile Picture" />
        </aside>

        <main className="profile__bodyMain">
          <form>
            <div>
              <h3>Name: </h3>
              <p>{user?.firstName || "Mphile"}</p>
            </div>

            <div>
              <h3>Surname: </h3>
              <p>{user?.lastName || "Mkwanazi"}</p>
            </div>

            <div>
              <h3>Email: </h3>
              <p>{user?.email || "email.email.com"}</p>
            </div>

            <div>
              <h3>Student Number: </h3>
              <p>{user?.studentNumber || "2017049467"}</p>
            </div>

            <label htmlFor="degree">
              <h3>Degree:</h3>
              {/* <input
                type="text"
                name="degree"
                id="degree"
                value={user?.degree || ""}
                disabled
                placeholder="BSc in IT"
              /> */}
              <p>{user?.degree || "Computer Information Systems"}</p>
            </label>

            <label htmlFor="degree">
              <h3>Bio:</h3>
              {/* <textarea
                name="bio"
                id="bio"
                value={user?.bio || ""}
                disabled
                placeholder="Tell us a little about your self"
              /> */}
                <p>{user?.bio || "Hello there..."}</p>
            </label>
          </form>
        </main>
      </section>
      {/* The page will have image on the left and The rest of the information will be on the right */}

      {/* At the top it will be a logo with the just a heading saying your profile */}
    </div>
  );
}

export default Profile;
