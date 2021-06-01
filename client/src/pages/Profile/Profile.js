import { GoVerified } from "react-icons/go";
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
      <header className="profile_header">
        <h1 className="title">Your Profile</h1>
      </header>

      <section className="profile__body">
        <aside className="profile__bodyAside">
          <ProfileImage title="Your Profile Picture" />
        </aside>

        <main className="profile__bodyMain">
          <div className="nameDiv">
            <p className="name">
              {user?.firstName || "Nkosingiphile "}{" "}
              {user?.lastName || "Mkwanazi"}
            </p>{" "}
            <GoVerified id="ico" />
            <hr className="separator" />
          </div>

          <form>
            <label htmlFor="degree">
              <h3>Student number:</h3>
              <input
                className="textBox"
                type="email"
                name="studentNo"
                id="textbox"
                disabled
                readOnly
                value={user?.studentNumber || "2017049467"}
              />
            </label>
            <label htmlFor="degree">
              <h3>Email:</h3>
              <input
                className="textBox"
                type="email"
                name="email"
                id="textbox"
                readOnly
                value={user?.email || "email.email.com"}
              />
            </label>
            <label htmlFor="degree">
              <h3>Field of study:</h3>
              <input
                className="textBox"
                type="text"
                name="degree"
                id="textbox"
                readOnly
                value={user?.degree || "Computer Information Systems"}
              />
            </label>

            <label htmlFor="degree">
              <h3>Bio:</h3>
              <textarea
                className="bioBox"
                name="bio"
                id="bio"
                readOnly
                value={user?.bio || "Hello there..."}
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
