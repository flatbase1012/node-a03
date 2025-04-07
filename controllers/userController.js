const User = require("../models/User");
const passport = require("passport");
const RequestService = require("../services/RequestService");

exports.Register = async function (req, res) {
  let reqInfo = RequestService.reqHelper(req);
  res.render("user/register", { errorMessage: "", user: {}, reqInfo: reqInfo });
};

exports.RegisterUser = async function (req, res) {
  const password = req.body.password;
  const passwordConfirm = req.body.passwordConfirm;
  if (password === passwordConfirm) {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      roles: ["User"]
    });
    User.register(newUser, req.body.password, function (err) {
      if (err) {
        let reqInfo = RequestService.reqHelper(req);
        return res.render("user/register", {
          user: newUser,
          errorMessage: err,
          reqInfo: reqInfo
        });
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    });
  } else {
    let reqInfo = RequestService.reqHelper(req);
    res.render("user/register", {
      user: {
        username: req.body.username,
        email: req.body.email
      },
      errorMessage: "Passwords do not match.",
      reqInfo: reqInfo
    });
  }
};

exports.Login = async function (req, res) {
  let reqInfo = RequestService.reqHelper(req);
  let errorMessage = req.query.errorMessage;
  res.render("user/login", {
    user: {},
    errorMessage: errorMessage,
    reqInfo: reqInfo
  });
};

exports.LoginUser = (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login?errorMessage=Invalid login."
  })(req, res, next);
};

exports.Logout = (req, res) => {
  req.logout(err => {
    if (err) {
      return next(err);
    } else {
      res.render("user/logout", { title: "Logged Out" });
    }
  });
};
