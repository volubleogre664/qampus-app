import { GoVerified } from "react-icons/go";
import PencilIcon from "@material-ui/icons/EditRounded";
import SaveIcon from "@material-ui/icons/SaveRounded";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import { useUserHelpers } from "../../Redux/getSlices";

import "./Profile.css";

function Profile() {
  const [{ user }] = useUserHelpers();
 
  const editBio = () =>{
    document.getElementById('bioEdit').style.display = "none";
    document.getElementById('btnSave2').style.display = "inline";
    document.getElementById('bio').disabled = false;
    document.getElementById('bio').focus();


    const textBox =  document.getElementById('textbox');
    if(!textBox.disabled){
      textBox.disabled = true;
      document.getElementById('btnSave').style.display = "none";
      document.getElementById('emailEdit').style.display = "inline";
    }

    const textBox1 =  document.getElementById('textbox1');
    if(!textBox1.disabled){
      textBox1.disabled = true;
      document.getElementById('btnSave1').style.display = "none";
      document.getElementById('degreeEdit').style.display = "inline";
    }

  }

  const saveBio = () =>{
    document.getElementById('btnSave2').style.display = "none";
    document.getElementById('bioEdit').style.display = "inline";
    document.getElementById('bio').disabled = true;
    
    if(user?.bio){
      user.bio = document.getElementById('bio').textContent;
    }
  }
  const editDeg = (e) =>{
    document.getElementById('degreeEdit').style.display = "none";
    document.getElementById('btnSave1').style.display = "inline";
    document.getElementById('textbox1').disabled = false;
    document.getElementById('textbox1').focus();
   
    const textBox =  document.getElementById('textbox');
    if(!textBox.disabled){
      textBox.disabled = true;
      document.getElementById('btnSave').style.display = "none";
      document.getElementById('emailEdit').style.display = "inline";
    }
   
    const bioBox =  document.getElementById('bio');
    if(!bioBox.disabled){
      bioBox.disabled = true;
      document.getElementById('btnSave2').style.display = "none";
      document.getElementById('bioEdit').style.display = "inline";
    }
    
  }
  const saveDeg = (e) =>{
    document.getElementById('btnSave1').style.display = "none";
    document.getElementById('degreeEdit').style.display = "inline";
    document.getElementById('textbox1').disabled = true;

    if(user?.degree){
      user.degree = document.getElementById('textbox1').textContent;
    }
  }

  const editEmail = (e) =>{
    document.getElementById('emailEdit').style.display = "none";
    document.getElementById('btnSave').style.display = "inline";
    document.getElementById('textbox').disabled = false;
    document.getElementById('textbox').focus();
    
    const textBox1 =  document.getElementById('textbox1');
    if(!textBox1.disabled){
      textBox1.disabled = true;
      document.getElementById('btnSave1').style.display = "none";
      document.getElementById('degreeEdit').style.display = "inline";
    }

    const bioBox =  document.getElementById('bio');
    if(!bioBox.disabled){
      bioBox.disabled = true;
      document.getElementById('btnSave2').style.display = "none";
      document.getElementById('bioEdit').style.display = "inline";
    }
  }

  const saveEmail = (e) =>{
    document.getElementById('btnSave').style.display = "none";
    document.getElementById('emailEdit').style.display = "inline";
    document.getElementById('textbox').disabled = true;

    if(user?.email){
      user.email = document.getElementById('textbox').textContent;
    }
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
                id="textbox2"
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
                disabled
                value={user?.email}
              />
              <PencilIcon className="btnEdit" id="emailEdit" onClick={editEmail}/>
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
                  id="textbox1"
                  disabled
                  value={user?.degree}
                />
                <PencilIcon className="btnEdit" id="degreeEdit" onClick={editDeg}/>
                <SaveIcon id="btnSave1" onClick={saveDeg}/>

              </div>
            </label>

            <label htmlFor="degree">
              <h3>Bio:</h3>
              <textarea
                className="bioBox"
                name="bio"
                id="bio"
                disabled
                value={user?.bio}
              />
              <PencilIcon className="btnEdit" id="bioEdit" onClick={editBio}/>
              <SaveIcon id="btnSave2" onClick={saveBio}/>
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
