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
    setBookCover(state, action) {
      if (!state.book) state.book = {};

      state.book[action.payload.coverName] = action.payload.file;
    },
    setBookList(state, action) {
      if (state.bookList.length) {
        state.bookList = [...state.bookList, action.payload];
      } else {
        state.bookList = [action.payload];
      }
    },
    setSearchBookList(state, action) {
      if (!state.searchBookList.find((item) => item.id === action.payload.id)) {
        state.searchBookList.push(action.payload);
      }
    },
    deleteBook(state, action) {
      if (state.bookList.find((item) => item.id === action.payload)) {
        state.bookList = state.bookList.filter(
          (book) => book.id !== action.payload
        );

        state.bookList.
      }
    },
  },
});

export const {
  setBook,
  setBookList,
  setSearchBookList,
  setBookCover,
  deleteBook,
} = booksSlice.actions;
export const selectBooks = (state) => state.book;
export default booksSlice.reducer;
