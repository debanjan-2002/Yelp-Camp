const express = require("express");
const router = express.Router();

const users = require("../controllers/users");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.get("/register", users.renderRegister);

router.post("/register", catchAsync(users.register));

router.get("/login", users.renderLogin);

router.post(
    "/login",
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
