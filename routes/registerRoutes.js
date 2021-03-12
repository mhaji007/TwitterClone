const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

// Import controllers
const { renderRegister, submitRegister } = require("../controllers/registerControllers");

// Tell server which template engine to use
app.set("view engine", "pug");
// Tell server where to find pug template files
app.set("views", "views");
// extended:false means body will only be able to contain key
// value pairs made up string or arrays

app.use(bodyParser.urlencoded({extended:false}))

router.get("/", renderRegister);
router.post("/", submitRegister);

module.exports = router;
