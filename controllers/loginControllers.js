exports.renderLogin = (req, res, next) => {
    var payload = {
      pageTitle: "Login",
    };
  res.status(200).render("Login", payload);
}
