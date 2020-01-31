const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const knex = require("knex");
const dotenv = require("dotenv");

const { getPostreSqlConnectionConfig } = require("./config/dbConnection");
const signUpController = require("./controllers/signup");
const loginController = require("./controllers/login");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();
app.use(bodyParser.json());
app.use(cors());

dotenv.config();
const db = knex(getPostreSqlConnectionConfig());

app.get("/", (req, res) => {
  res.json("Hello from default route by face recognition server.");
});

app.post("/login", (req, res) => {
  loginController.handleLogIn(req, res, db);
});

app.post("/signup", (req, res) => {
  signUpController.handleSignUp(req, res, db);
});

app.get("/profile/:id", (req, res) => {
  profile.getProfile(req, res, db);
});

app.put("/image", (req, res) => {
  image.updateSubmittedPhotos(req, res, db);
});

app.post("/imageUrl", (req, res) => {
  image.initializeClarifaiApi(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
