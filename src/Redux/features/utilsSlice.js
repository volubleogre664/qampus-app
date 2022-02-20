import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  popup: {
    title: "",
    subtitle: "",
    btnCancel: false,
    btnContinue: false,
    bookTitle: "",
    popupShow: false,
  },
};

const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setPopupData(state, action) {
      state.popup = { ...action.payload };
    },

    clearPopupData(state, _) {
      state.popup = initialState.popup;
    },
  },
});

export const { setPopupData, clearPopupData } = utilsSlice.actions;
export const getUtils = (state) => state.utils;
export default utilsSlice.reducer;
