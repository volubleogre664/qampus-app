import { useForm } from "@utils/hooks.js";
import { useUserSlice } from "@redux/getSlices";
import profilePlaceholder from "@assets/profile.png";

import "./NewUser.css";

function NewUser() {
  const [{ user }] = useUserSlice();
  const { onSubmit, onChange, values } = useForm(null, {});

  return (
    <div className="newUser">
      <header className="newUser__header">
        <h2>
          Before you continue to Qampus we'd like to get more info about you
        </h2>
      </header>

      <main className="newUser__main">
        <form
          autoComplete="off"
          className="newUser__mainForm"
          onSubmit={onSubmit}
        >
          <div>
            <label htmlFor="university">Qualification</label>
            <input
              className="newUser__mainFormInput"
              name="university"
              type="text"
              id="university"
              value={values?.campusName}
              onChange={onChange}
            />
            <p>
              Write something about why we takingg their university of study
            </p>
          </div>

          <div>
            <label htmlFor="campusName">Qualification</label>
            <input
              className="editProfile__mainFormInput"
              name="campusName"
              type="text"
              id="campusName"
              value={values?.campusName}
              onChange={onChange}
            />
            <p>Helps us show you things relavant only to your campus</p>
          </div>

          <div>
            <label htmlFor="degree">Qualification</label>
            <input
              className="editProfile__mainFormInput"
              name="degree"
              type="text"
              id="degree"
              value={values?.degree}
              onChange={onChange}
            />
            <p>
              Let others on Qampus know what you're studying. You might get a
              study partner
            </p>
          </div>
        </form>

        <div className="newUser__mainImage">
          <span>Profile Image</span>
          <div className="image-container">
            <img
              src={user?.picture || profilePlaceholder}
              alt="edit your profile"
            />
          </div>
          <button>Upload Image</button>

          {/* If user image exists the we remove it and show the person default */}
          <button>Remove Image</button>
        </div>
      </main>

      <footer className="newUser__footer">
        <button>Save Changes</button>
      </footer>
    </div>
  );
}

export default NewUser;
