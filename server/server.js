const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const signUpController = require("./controllers/signup");
const loginController = require("./controllers/login");
const profile = require("./controllers/user");
const image = require("./controllers/image");

app.get("/", (req, res) => {
  res.json("Greetings from default route by face recognition server.");
});

app.post("/login", (req, res) => {
  loginController.handleLogIn(req, res);
});

app.post("/signup", (req, res) => {
  signUpController.handleSignUp(req, res);
});

app.get("/profile/:id", (req, res) => {
  profile.getProfile(req, res);
});

app.put("/image", (req, res) => {
  image.updateSubmittedPhotos(req, res);
});

app.post("/imageUrl", (req, res) => {
  image.initializeClarifaiApi(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
