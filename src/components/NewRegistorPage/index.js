// import { useUserSlice, useUtilsSlice } from "@redux/getSlices.js";
import { useForm } from "@utils/hooks.js";

import "./Registor.css";

function Registor() {
  const { values, onChange, onSubmit } = useForm(null, {
    email: "",
    firstName: "",
    lastName: "",
    university: "",
    campus: "",
    degree: "",
    gender: "",
  });

  return (
    <div className="reg">
      <aside className="reg__aside">
        <h2>Welcome to Qampus</h2>

        <p>We just need a few details to get you started.</p>
      </aside>

      <main className="reg__body">
        <h3>Give us a little more about you</h3>

        <form onSubmit={onSubmit}>
          <div className="email__container">
            <label htmlFor="email">Email</label>
            <input
              className="login__mainFormInput"
              name="email"
              value={values.email}
              onChange={onChange}
              type="text"
              id="email"
            />
          </div>
        </form>
      </main>
    </div>
  );
}

export default Registor;
