import mongoose from "mongoose";
const { model, Schema } = mongoose;

const msgSchema = new Schema({
  to: String,
  from: String,
  time: String,
  textMsg: String,
});

export default model("Message", msgSchema);
