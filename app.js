const express = require("express")
require("dotenv").config();


const app = express();

const port = process.env.PORT;
const {requireLogin} = require("./middleware")

const server = app.listen(port, () => console.log("Server listening on port " + port))

// Tell server which template engine to use
app.set("view engine", "pug");
// Tell server where to find pug template files
app.set("views", "views")

const loginRoute = require("./routes/loginRoutes")

app.use("/login", loginRoute)

app.get("/", requireLogin, (req, res, next) => {
  // Dynamic page title
  // Dynamically pass data from server to template
  // payload sen to to and accessed in home.pug
  var payload = {
    pageTitle:"Home"
  }
  res.status(200).render("home", payload)
})
