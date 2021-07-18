import pkg from "apollo-server";
// import { UserInputError } from "apollo-server";
const { UserInputError } = pkg;
import Book from "../../models/Book.js";
import checkAuth from "../../utils/checkAuth.js";
import { validateBookInput } from "../../utils/validators.js";

const bookResolvers = {
  Mutation: {
    async uploadBook(_, { bookInput }, context) {
      const user = checkAuth(context);

      const { errors, valid } = validateBookInput(bookInput);

      if (!valid) {
        throw new UserInputError("Error uploading book data", { errors });
      }

      if (bookInput.studentNumber !== user.studentNumber) {
        throw new UserInputError("Action not allowed", {
          errors: {
            studentNumber: "Cannot add book with another student Number",
          },
        });
      }

      const bookExist = await Book.findOne({
        isbn: bookInput.isbn,
        studentNumber: bookInput.studentNumber,
      });
      if (bookExist) {
        throw new UserInputError("You already have this book uploaded", {
          errors: {
            book: "Book already exist in your collection",
          },
        });
      }

      const newBook = new Book({
        isbn: bookInput.isbn,
        title: bookInput.title,
        subtitle: bookInput.subtitle || "",
        authors: bookInput.authors,
        price: bookInput.price,
        description: bookInput.description || "",
        moduleCode: bookInput.moduleCode || "",
        studentNumber: bookInput.studentNumber,
        frontCover: bookInput.frontCover || "",
        backCover: bookInput.backCover || "",
      });

      const res = await newBook.save();

      // console.log(res);
      return res;
    },

    async deleteBook(_, { bookId }, context) {
      const user = checkAuth(context);

      try {
        const book = await Book.findById(bookId);

        if (!book) {
          throw new Error("An error occured while deleting book", {
            errors: {
              book: "Requested boook does not exist.",
            },
          });
        }

        if (user.studentNumber !== book.studentNumber) {
          throw new Error("An error occured while deleting book", {
            errors: {
              book: "Cannot delete book a you do not own",
            },
          });
        }

        await book.delete();

        return "Deleted#Book deleted successfully";
      } catch (err) {
        throw new Error("An error occured while deleting book", {
          errors: err,
        });
      }
    },

    async editBook(_, { bookId, price, isBought }, context) {
      checkAuth(context);

      // NOTE: Add some code to make sure that everyone who wants
      // this book is notified that this book has been sold,
      // Still need to find a way to actually do that

      try {
        const book = await Book.findById(bookId);

        if (!book) {
          throw new Error("Could not find the book you're looking for.");
        }

        if (book.price !== price) {
          book.price = price;
        }
        if (!book.isBought && isBought) {
          book.isBought = isBought;
        }

        return await book.save();
      } catch (err) {
        throw new UserInputError("Error finding your book", err);
      }
    },
  },
  Query: {
    async getBook(_, { bookId }) {
      try {
        const book = await Book.findById(bookId);
        if (!book) {
          throw new Error("Could not find required book", {
            errors: {
              book: "Requested book does not exist",
            },
          });
        }

        return book;
      } catch (err) {
        throw new Error("Could not find required book", {
          errors: err,
        });
      }
    },

    async getBooks(_, { studentNumber }) {
      try {
        const books = await Book.find({ studentNumber });

        return books;
      } catch (err) {
        throw new Error("An error occured while getting the books", {
          errors: err,
        });
      }
    },

    async getBookTitles() {
      try {
        const bookTitles = await Book.find({}, { title: 1 });

        return bookTitles;
      } catch (err) {
        throw new Error("Could not find the book titles", {
          errors: err,
        });
      }
    },
  },
};

export default bookResolvers;
