const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

// Import controllers
const { logout } = require("../controllers/logoutController");

// Tell server which template engine to use
app.set("view engine", "pug");
// Tell server where to find pug template files
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", logout);

module.exports = router;
