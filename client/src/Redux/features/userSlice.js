import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  path: "",
  errors: {},
  imgCrop: { imgSrc: null, croppedImgUrl: null },
};

if (localStorage.getItem("jwtToken")) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
  } else {
    initialState.user = JSON.parse(localStorage.getItem("user"));
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;

      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }

      localStorage.setItem("user", JSON.stringify(state.user));
    },
    clearUser(state) {
      state.user = null;
    },
    setPath(state, action) {
      state.path = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    setImgSrc(state, action) {
      state.imgCrop = action.payload;
    },
    addUserContact(state, action) {
      if (state.user?.contacts?.length) {
        state.user.contacts.push(action.payload);
      } else {
        state.user.contacts = [action.payloads];
      }

      if (localStorage.getItem("user")) {
        localStorage.removeItem("user");
      }

      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const {
  setUser,
  clearUser,
  setPath,
  setErrors,
  setImgSrc,
  addUserContact,
} = userSlice.actions;
export const selectUser = (state) => state?.user;
export default userSlice.reducer;
