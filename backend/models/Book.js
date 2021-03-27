import mongoose from "mongoose";
const { model, Schema } = mongoose;

const bookSchema = new Schema({
  isbn: String,
  title: String,
  noduleCode: String,
  authors: String,
  price: Number,
  edition: Number,
  frontCover: String,
  backCover: String,
});

export default model("Book", bookSchema);
