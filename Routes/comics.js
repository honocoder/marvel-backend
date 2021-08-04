// Express call and routers initialization
const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route 1 : get a list of comics
router.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/comics?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// TODO
// Route 2 : get a list of comics containing a specific character
router.get("comics/:characterId", async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/comics/${req.query.id}?apiKey=${process.env.API_KEY}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
