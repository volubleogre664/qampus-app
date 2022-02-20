import { useForm } from "@utils/hooks.js";
import { useUserSlice } from "@redux/getSlices";
import profilePlaceholder from "@assets/profile.png";

import "./NewUser.css";

function NewUser() {
  const [{ user }] = useUserSlice();
  const { onSubmit, onChange, values } = useForm(null, {});

  return (
    <div className="newUser__overlay">
      <section className="newUser">
        <header className="newUser__header">
          <h2>Finish setting up your Qampus account</h2>
        </header>

        <main className="newUser__main">
          <form
            autoComplete="off"
            className="newUser__mainForm"
            onSubmit={onSubmit}
          >
            <div>
              <label htmlFor="university">University</label>
              <input
                className="editProfile__mainFormInput"
                name="university"
                type="text"
                id="university"
                value={values?.campusName}
                onChange={onChange}
              />
              <p>Helps us show you things relavant only to your university</p>
            </div>

            <div>
              <label htmlFor="campusName">Campus</label>
              <input
                className="editProfile__mainFormInput"
                name="campusName"
                type="text"
                id="campusName"
                value={values?.campusName}
                onChange={onChange}
              />
              <p>Which {values?.university || "UFS"} campus are you on?</p>
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

            <div>
              <label htmlFor="degree">Gender</label>
              <div className="newUser__mainFormRadio">
                <span>
                  <input
                    name="gender"
                    type="radio"
                    id="male"
                    value="Male"
                    onChange={onChange}
                  />
                  <label htmlFor="male">Male</label>
                </span>

                <span>
                  <input
                    name="gender"
                    type="radio"
                    id="female"
                    value="Female"
                    onChange={onChange}
                  />
                  <label htmlFor="female">Female</label>
                </span>

                <span>
                  <input
                    name="gender"
                    type="radio"
                    id="notSay"
                    value="Rather not say"
                    onChange={onChange}
                  />
                  <label htmlFor="notSay">Rather not say</label>
                </span>
              </div>
              <p>
                Optional - Just select rather not say if you don't feel likee it
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
          <button>Continue</button>
        </footer>
      </section>
    </div>
  );
}

export default NewUser;
