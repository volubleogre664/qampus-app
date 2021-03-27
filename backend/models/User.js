import mongoose from "mongoose";
const { model, Schema } = mongoose;

const userSchema = new Schema({
  studentNumber: String,
  firstName: String,
  lastName: String,
  email: String,
  picture: String,
  degree: String,
  bio: String,
  password: String,
});

export default model("User", userSchema);
