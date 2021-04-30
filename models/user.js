const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "/images/profile.jpg",
  },

  // Array of posts user has liked
  // If we did not keep track of likes here
  // It would mean to get all the posts that a user liked
  // we need to query every single post to check them all to
  // see which one contained the user which
  // is quite an expensive operation

  likes:[{type: ObjectId, ref:"Post"}]
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);
