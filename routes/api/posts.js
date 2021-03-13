const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../../models/user");

// Import controllers
const { createPost } = require("../../controllers/postControllers");

app.use(bodyParser.urlencoded({ extended: false }));

router.post("/posts", createPost);

module.exports = router;
