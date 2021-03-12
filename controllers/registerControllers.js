exports.renderRegister = (req, res, next) => {
  var payload = {
    pageTitle: "Register",
  };
  res.status(200).render("Register", payload);
};

exports.submitRegister = async (req, res, next) => {
  // Store values entered by the user
  var body = req.body;
  var firstName = req.body.firstName.trim();
  var lastName = req.body.lastName.trim();
  var username = req.body.username.trim();
  var email = req.body.email.trim();
  var password = req.body.password;
  const User = require("../models/user");

  var payload = {
    pageTitle: "Register",
    ...body,
  };
  // Check whether fields are not empty
  if (firstName && lastName && username && email && password) {
    var user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    }).catch((error) => {
      console.error(error);
      payload.errorMessage = "Something went wrong";
      res.status(200).render("Register", payload);
    });
    if (user == null) {
      // No user found
    } else {
      // User found
      if (email == user.email) {
        payload.errorMessage = "Email already in use";
      } else {
        payload.errorMessage = "Username already in use";
      }
      res.status(200).render("register", payload)
    }
  }
  // If a field is missing return the register page
  // with prefilled values for fields with value
  // along with an error
  else {
    payload.errorMessage = "Please provide a valid value for all fields";
    res.status(200).render("Register", payload);
  }
};
