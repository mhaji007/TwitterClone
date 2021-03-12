const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.renderLogin = (req, res, next) => {
  var payload = {
    pageTitle: "Login",
  };
  res.status(200).render("login", payload);
};

exports.submitLogin = async (req, res, next) => {
  var body = req.body;
  var payload = {
    pageTitle: "Login",
    ...body,
  };
  if (req.body.logUsername && req.body.logPassword) {
    var user = await User.findOne({
      $or: [
        { username: req.body.logUsername },
        { password: req.body.logPassword },
      ],
    }).catch((error) => {
      console.log(error);
      payload.errorMessage = "Something went wrong";
      res.status(200).render("login", payload);
    });
    // User found
    if (user != null) {
      // Compare passwords
      var result = await bcrypt.compare(req.body.logPassword, user.password);
      if (result === true) {
        req.session.user = user;
        return res.redirect("/");
      }
    }
    // Display error either when the passwords did not match
    // or user was not found
    payload.errorMessage = "Incorrect login credentials";
    return res.status(200).render("login", payload);
  }
  payload.errorMessage = "Please provide a valid value for all fields";
  res.status(200).render("login", payload);
};
