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
const userController = require("./controllers/user");
const recognitionController = require("./controllers/recognition");
const savedRecognitionsController = require("./controllers/savedRecognitions");

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
  userController.getProfile(req, res);
});

app.get("/statistics/:id", (req, res) => {
  userController.getUserRecognitionStatistics(req, res);
});

app.put("/update-statistics", (req, res) => {
  userController.updateRecognitionStatistics(req, res);
});

app.post("/recognize", (req, res) => {
  recognitionController.recognizeFaces(req, res);
});

app.get("/recognitions", (req, res) => {
  savedRecognitionsController.getSavedRecognitions(req, res);
});

app.post("/save-recognition", (req, res) => {
  savedRecognitionsController.saveRecognition(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
