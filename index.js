// ExpressJS, Express Formidable and Mongoose import
require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

// Server's initialization
const app = express();
app.use(formidable());
app.use(cors());

// TODO
// Connexion to the database
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Routes import
const comicsRoutes = require("./Routes/comics");
const charactersRoutes = require("./Routes/Characters");
const usersRoutes = require("./Routes/users");
app.use(comicsRoutes);
app.use(charactersRoutes);
app.use(userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome on Marvel API!" });
});

// Undefined routes management
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

// Listen to a port (4000)
app.listen(process.env.PORT, () => {
  console.log("⚡️ Server started ⚡️");
});
