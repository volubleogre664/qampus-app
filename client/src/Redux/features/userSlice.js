import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

const initialState = {
  user: null,
  path: "",
  errors: {},
};

if (localStorage.getItem("jwtToken").length > 10) {
  const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("jwtToken");
  } else {
    initialState.user = decodedToken;
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
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
  },
});

export const { setUser, clearUser, setPath, setErrors } = userSlice.actions;
export const selectUser = (state) => state?.user;
export default userSlice.reducer;
