import { Redirect } from "react-router-dom";

import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { useUserHelpers } from "../../Redux/getSlices";

import "./Profile.css";

function Profile() {
  const [{ user }, dispatch] = useUserHelpers();

  if (!user) {
    dispatch({
      type: "SET_PATH",
      payload: "/profile",
    });
    return <Redirect to="/login" />;
  }

  return (
    <div className="profile">
      <header className="finaliseReg__header">
        <h1 className="title">Your Profile</h1>
      </header>

      <section className="profile__body">
        <aside className="profile__bodyAside">
          <ProfileImage title="Your Profile Picture" />
        </aside>

        <main className="profile__bodyMain">
          <form>
            <div>
              <h3>Name: </h3>
              <p>{user.firstName}</p>
            </div>

            <div>
              <h3>Surname: </h3>
              <p>{user.lastName}</p>
            </div>

            <div>
              <h3>Email: </h3>
              <p>{user.email}</p>
            </div>

            <div>
              <h3>Student Number: </h3>
              <p>{user.studentNumber}</p>
            </div>

            <label htmlFor="degree">
              Degree: <br />
              <input
                type="text"
                name="degree"
                id="degree"
                value={user?.degree || ""}
                disabled
                placeholder="BSc in IT"
              />
            </label>

            <label htmlFor="degree">
              Bio: <br />
              <textarea
                name="bio"
                id="bio"
                value={user?.bio || ""}
                disabled
                placeholder="Tell us a little about your self"
              />
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
