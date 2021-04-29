const Post = require("../models/post");
const User = require("../models/user");

// Create a post
exports.createPost = async (req, res, next) => {
  if (!req.body.content) {
    console.log("Content param not sent with request");
    res.sendStatus(400);
  }

  var postData = {
    content: req.body.content,
    postedBy: req.session.user,
  };

  Post.create(postData)
    .then(async (newPost) => {
      newPost = await User.populate(newPost, { path: "postedBy" });
      res.status(201).send(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

// Retrieve all posts
exports.getPosts = async (req, res, next) => {
  Post.find()
    .populate("postedBy")
    .sort({"createdAt":-1})
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(400);
    });
};

exports.addLike = async (req, res, next) => {
  // 204 ==> success, but with no result to return
  console.log(req.params.id)

  var postId = req.params.id;
  var userId = req.session.user._id;

  var isLiked = req.session.user.likes && req.session.user.likes.includes(postId)

  var option = isLiked ? "$pull" : "$addToSet"

  // Insert user like
  await User.findByIdAndUpdate(userId, {[option]:{likes: postId}})

  console.log(isLiked)


  res.status(200).send("Liked!")
}
