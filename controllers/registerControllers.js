exports.renderRegister = (req, res, next) => {
    var payload = {
      pageTitle: "Register",
    };
  res.status(200).render("Register", payload);
};


