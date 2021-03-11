const express = require("express");
const app = express();
const router = express.Router();

// Import controllers
const { renderRegister } = require("../controllers/registerControllers");

// Tell server which template engine to use
app.set("view engine", "pug");
// Tell server where to find pug template files
app.set("views", "views");

router.get("/", renderRegister);

module.exports = router;
