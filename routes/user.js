const express = require("express");
const router = express.Router({mergeParams: true});
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
let {redirectUrl, isLoggedIn} = require("../middleware.js");

const userController = require("../controllers/user.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginForm)
.post(redirectUrl, passport.authenticate("local", { failureRedirect: "/login", failureFlash: true}) , userController.login);

// Logout Route
router.get("/logout", userController.logout);

// Account Route
router.get("/account", userController.renderAccount)

module.exports = router;