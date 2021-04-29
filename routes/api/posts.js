const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../models/user");
const Post = require("../../models/post");

// Import controllers
const { createPost, getPosts, addLike } = require("../../controllers/postControllers");

app.use(bodyParser.urlencoded({ extended: false }));

router.post("/posts", createPost);
router.get("/posts", getPosts);
router.put("/posts/:id/like", addLike)

module.exports = router;
