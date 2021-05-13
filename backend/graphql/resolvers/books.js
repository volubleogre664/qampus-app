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
        subtitle: bookInput?.subtitle || "",
        authors: bookInput.authors,
        price: bookInput.price,
        description: bookInput?.description || "",
        moduleCode: bookInput?.moduleCode || "",
        studentNumber: bookInput.studentNumber,
        frontCover: bookInput?.frontCover || "",
        backCover: bookInput?.backCover || "",
      });

      const res = await newBook.save();

      // console.log(res);
      return res;
    },
  },
  Query: {
    async getBook(_, { bookId }) {
      try {
        const book = await Book.findById(bookId);
        if (!book) {
          throw new Error("Could not find required book");
        }

        return book;
      } catch (err) {
        throw new Error("Could not find required book", err);
      }
    },
  },
};

export default bookResolvers;
