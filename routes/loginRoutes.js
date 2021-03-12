const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");

// Import controllers
const {renderLogin, submitLogin} = require("../controllers/loginControllers")


// Tell server which template engine to use
app.set("view engine", "pug");
// Tell server where to find pug template files
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", renderLogin)
router.post("/", submitLogin)

module.exports = router;
