const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    // required:true is not set here
    // since when re-tweeting there is no content
    content: { type: String, trim: true },

    postedBy: { type: ObjectId, ref: "User" },
    // Array of all users that have liked a given post
    likes: [{ type: ObjectId, ref: "User" }],
    pinned: Boolean,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
