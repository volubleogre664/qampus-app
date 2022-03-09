import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  path: "",
  errors: {},
  imgCrop: { imgSrc: null, croppedImgUrl: null, croppedBookImgUrl: null },
};

// This is where we get a cookie from the browser
// For getting cookies that have been encoded
const getCookie = (cookieName, isObj = true) => {
  let cookie = document.cookie;
  cookieName = cookieName + "=";

  if (!cookie) return null;

  let savedItem;
  cookie = cookie.split(";");
  cookie.forEach((item) => {
    if (item.includes(cookieName)) {
      savedItem = item.substring(cookieName.length + 1, item.length);
    }
  });

  if (!savedItem) return null;

  savedItem = new Uint8Array(savedItem.split(","));
  savedItem = new TextDecoder().decode(savedItem);
  savedItem = isObj
    ? "{" + savedItem.substring(1, savedItem.length - 1) + "}"
    : "[" + savedItem.substring(1, savedItem.length - 1) + "]";

  return JSON.parse(savedItem);
};

// Setting a cookie for saving in the browser
// This is for items like objects and arrays, encode first then save
const setCookie = (cookieName, value, expires = 2) => {
  value = JSON.stringify(value);
  value = new TextEncoder().encode(value);
  value = value.toString();

  const date = new Date();
  expires = date.setDate(date.getDate() + expires * 24 * 60 * 60 * 1000);

  document.cookie = `${cookieName}=${value};expires=${expires.toLocaleString()};path=/`;
};

// Get the user data from cookies if it is available
initialState.user = getCookie("user");
if (initialState.user) {
  initialState.user.contacts = getCookie("contacts", false);
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;

      const { token, contacts, ...userData } = state.user;
      setCookie("user", userData);
      contacts.length && setCookie("contacts", contacts);
    },
    clearUser(state) {
      state.user = null;
      document.cookie = "user=;max-age=0";
      document.cookie = "contacts=;max-age=0";
    },
    setEditUser(state, action) {
      state.user.edit = action.payload.edit;
    },
    setPath(state, action) {
      state.path = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    setNewUser(state, action) {
      state.user.newUser = action.payload.newUser;
    },
    setImgSrc(state, action) {
      state.imgCrop = action.payload;
    },
    addUserContact(state, action) {
      if (!action.payload) {
        return;
      }

      if (state.user?.contacts?.length) {
        state.user.contacts.push(action.payload);
      } else {
        state.user.contacts = [action.payload];
      }

      setCookie("contacts", state.user.contacts);
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
  setEditUser,
  setNewUser,
} = userSlice.actions;
export const selectUser = (state) => state?.user;
export default userSlice.reducer;
