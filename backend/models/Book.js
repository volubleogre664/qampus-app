import mongoose from "mongoose";
const { model, Schema } = mongoose;

const bookSchema = new Schema({
  isbn: String,
  title: String,
  subtitle: String,
  authors: String,
  price: Number,
  description: String,
  moduleCode: String,
  studentNumber: String,
  frontCover: String,
  backCover: String,
});

export default model("Book", bookSchema);
