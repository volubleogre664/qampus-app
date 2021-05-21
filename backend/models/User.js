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
  contacts: [
    {
      id: Schema.Types.ObjectId,
      firstName: String,
      lastName: String,
      studentNumber: String,
      picture: String,
    },
  ],
  password: String,
});

export default model("User", userSchema);
