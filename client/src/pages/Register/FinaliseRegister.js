import { useEffect } from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "@material-ui/core";

import { useUserHelpers } from "../../Redux/getSlices";
import { REGISTER_USER } from "../../utils/graphql";
import { useForm } from "../../utils/hooks";

import appLogo from "../../logo.png";
import "./FinaliseRegister.css";
import ProfileImage from "../../components/ProfileImage/ProfileImage";

function CompleteRegistration({ history }) {
  const [{ path }] = useUserHelpers();

  const { onChange, onSubmit, values } = useForm(updateUser, {
    profile: "",
    degree: "",
    bio: "",
  });

  const [updateProfile, { loading }] = useMutation(REGISTER_USER, {
    variables: values,
    update(_, { data: { success } }) {
      if (success) {
        console.log(success);
      }
    },
    onError(err) {
      console.log(err);
    },
  });

  const finishLaterClick = () => {
    (path && history.push(path)) || history.push("/");
  };

  function updateUser() {
    updateProfile();
  }

  useEffect(() => {
    document.title = "Qampus | Finish Signing Up";
  }, []);

  return (
    <div className="finaliseReg">
      <header className="finaliseReg__header">
        <img cclassName="logo" src={appLogo} alt="campus app logo" />
        <h1 className="title">Finish setting up your profile</h1>
      </header>

      <section className="finaliseReg__body">
        <aside className="finaliseReg__bodyAside">
          <ProfileImage title="Upload Profile Image" />
        </aside>

        <main className="finaliseReg__bodyMain">
          <h1>More information about you: </h1>
          <form onSubmit={onSubmit}>
            <label htmlFor="degree">
              Degree: <br />
              <input
                type="text"
                name="degree"
                className="formInput"
                placeholder="BSc in IT"
                value={values.degree}
                onChange={onChange}
                id="degree"
              />
            </label>

            <label htmlFor="bio">
              Bio: <br />
              <textarea
                name="bio"
                id="bio"
                className="formInput"
                placeholder="Tell us a little about you..."
              />
            </label>

            <Button type="submit" className="formSubmit">
              Finish
            </Button>
          </form>
        </main>

        <footer>
          <Button onClick={finishLaterClick} className="btnSkip">
            Finish later
          </Button>
        </footer>
      </section>
    </div>
  );
}

export default CompleteRegistration;
