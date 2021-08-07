// Packages imports and Routers initialization
const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

// Model import
const User = require("../models/User");

// Route 1 : Signup
router.post("/user/signup", async (req, res) => {
  try {
    // Verifying if the email doesn't already exists in the db
    const user = await User.findOne({ email: req.fields.email });

    if (!user) {
      // Password
      // SALT generation
      const salt = uid2(64);
      console.log("SALT ===>", salt);

      // HASH generation
      const hash = SHA256(req.fields.password + salt).toString(encBase64);
      console.log("HASH ===>", hash);

      // TOKEN generation
      const token = uid2(64);
      console.log("TOKEN ===>", token);

      // User creation
      const newUser = new User({
        email: req.fields.email,
        account: {
          username: req.fields.username,
        },
        token: token,
        hash: hash,
        salt: salt,
      });

      // Saving the user to the db
      await newUser.save();

      res.status(200).json({
        _id: newUser._id,
        token: token,
        account: {
          username: req.fields.username,
        },
      });
    } else {
      res.status(409).json({ message: "This email already exists." });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route 2 : Login
router.post("/user/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    const password = req.fields.password;
    const newHash = SHA256(password + user.salt).toString(encBase64);

    if (newHash === user.hash) {
      res.status(200).json({
        _id: user.id,
        token: user.token,
        accout: user.account,
      });
    } else {
      res.status(200).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Routers export
module.exports = router;
