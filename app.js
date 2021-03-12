const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require("body-parser");
const { requireLogin } = require("./middleware");
const mongoose = require("mongoose");

const app = express();

// Connect to Database
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Successfully connected to the Database"))
  .catch((err) => console.log("Database connection error", err));



// Tell server which template engine to use
app.set("view engine", "pug");
// Tell server where to find pug template files
app.set("views", "views");

// Static fies are files that are not processed by the server
// before being handed down to the client (browser)
// __dirname gives absolute path to the file that is currently running
app.use(express.static(path.join(__dirname, "public")));

const loginRoute = require("./routes/loginRoutes");
const registerRoute = require("./routes/RegisterRoutes");
app.use(bodyParser.urlencoded({ extended: false }));

// Route middlewares
app.use("/login", loginRoute);
app.use("/register", registerRoute);

app.get("/", requireLogin, (req, res, next) => {
  // Dynamic page title
  // Dynamically pass data from server to template
  // payload sen to to and accessed in home.pug
  var payload = {
    pageTitle: "Home",
  };
  res.status(200).render("home", payload);
});

const port = process.env.PORT || 4000;

const server = app.listen(port, () =>
  console.log("Server listening on port " + port)
);
