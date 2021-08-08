// Express call and routers initialization
const express = require("express");
const router = express.Router();
const axios = require("axios");

// Route 1 : get a list of characters
router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&skip=${req.query.skip}&limit=${req.query.limit}&name=${req.query.name}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
