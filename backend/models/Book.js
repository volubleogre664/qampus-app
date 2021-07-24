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
  isBought: Boolean,
  bookBuyers: [Schema.Types.ObjectId],
});

export default model("Book", bookSchema);
