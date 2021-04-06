import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  book: null, // The book that is currently being uploaded
  bookList: [], // Books in your collection
  searchBookList: [], // Books from your search results
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBook(state, action) {
      state.book = action.payload;
    },
    setBookList(state, action) {
      if (action.payload) {
        state.bookList = [...state.bookList, action.payload];
      } else {
        state.bookList = action.payload;
      }
    },
    setSearchBookList(state, action) {
      if (action.payload) {
        state.searchBookList = [...state.searchBookList, action.payload];
      } else {
        state.searchBookList = action.payload;
      }
    },
  },
});

export const { setBook, setBookList, setSearchBookList } = booksSlice.actions;
export const selectBooks = (state) => state.books;
export default booksSlice.reducer;
