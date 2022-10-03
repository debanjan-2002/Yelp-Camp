const express = require("express");
const router = express.Router();

const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router
    .route("/register")
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router
    .route("/login")
    .get(users.renderLogin)
    .post(
        passport.authenticate("local", {
            failureFlash: true,
            failureRedirect: "/login",
            // This is required for succesfully redirecting to the page last visited (without logging in)
            keepSessionInfo: true
        }),
        users.login
    );

router.get("/logout", users.logout);

module.exports = router;
