import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "UserData",
    required: true,
  },
  CreatedDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("BlogData", blogSchema);
