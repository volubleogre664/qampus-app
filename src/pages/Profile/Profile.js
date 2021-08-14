import { GoVerified } from "react-icons/go";
import PencilIcon from "@material-ui/icons/EditRounded";
import SaveIcon from "@material-ui/icons/SaveRounded";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { useUserHelpers } from "../../Redux/getSlices";

import "./Profile.css";

function Profile() {
  const [{ user }] = useUserHelpers();
  const editBio = (e) =>{
      /* 
        1. Hide edit button.
        2. Make textbox active.
        3. Show save button.
      */
  }

  const saveBio = (e) =>{
    /* 
      1. Hide save button.
      2. Make textbox inactive.
      3. Show edit button.
      4. Save data
    */
  }
  const editDeg = (e) =>{
    /* 
      1. Hide edit button.
      2. Make textbox active.
      3. Show save button.
    */
  }
  const saveDeg = (e) =>{
    /* 
      1. Hide save button.
      2. Make textbox inactive.
      3. Show edit button.
      4. Save data
    */
  }

  const editEmail = (e) =>{
    /* 
      1. Hide edit button.
      2. Make textbox active.
      3. Show save button.
    */
  }
  const saveEmail = (e) =>{
    /* 
      1. Hide save button.
      2. Make textbox inactive.
      3. Show edit button.
      4. Save data
    */
  }
  return (
    <div className="profile">
    
          <div className="nameDiv">
            <p className="name">
              {user?.firstName || "Nkosingiphile "}{" "}
              {user?.lastName || "Mkwanazi"}
              <GoVerified id="ico" />
            </p>{" "}
            <hr className="separator" />
          </div>

      <section className="profile__body">
        <aside className="profile__bodyAside">
          <ProfileImage title="Your Profile Picture" src={user?.picture} />
        </aside>

        <main className="profile__bodyMain">
         
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
              <div>
              <input
                className="textBox"
                type="email"
                name="email"
                id="textbox"
                readOnly
                value={user?.email || "email.email.com"}
              />
              <PencilIcon className="btnEdit" onClick={editEmail}/>
              <SaveIcon id="btnSave" onClick={saveEmail}/>
              </div>
            </label>
            <label htmlFor="degree">
              <h3>Field of study:</h3>
              <div>
                <input
                  className="textBox"
                  type="text"
                  name="degree"
                  id="textbox"
                  readOnly
                  value={user?.degree || "Computer Information Systems"}
                />
                <PencilIcon className="btnEdit" onClick={editDeg}/>
                <SaveIcon id="btnSave" onClick={saveDeg}/>

              </div>
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
              <PencilIcon className="btnEdit" onClick={editBio}/>
              <SaveIcon id="btnSave" onClick={saveBio}/>
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
