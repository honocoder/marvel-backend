const express = require("express");
const router = express.Router();
const axios = require("axios");
const isAuthenticated = require("../middlewares/isAuthenticated");

const User = require("../models/User");

router.post("/user/addFavorite", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findOne({ token: req.fields.token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
