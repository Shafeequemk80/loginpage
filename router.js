const express = require("express");
const router = express.Router();

const credential = {
  email: "shafeeque@gmail.com",
  password: "admin",
};

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
};
router.post("/login", (req, res) => {
  

  if (
    req.body.email == credential.email &&
    req.body.password == credential.password
  ) {
    req.session.user = req.body.email;
    res.redirect("/route/dashboard");
    // res.end("Login Successful..!")
  } else {
    res.render("base", { invalid: "invalid Email or password" });
  }
});

router.get("/dashboard", isAuthenticated, (req, res) => {
  res.render("dashboard", { user: req.session.user });
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send("error,");
    } else {
      res.render("base", { title: "logout", logout: "Logout Successfully..!" });
    }
  });
});

module.exports = router;
