const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const authorizationHelper = require("./helpers/authorization");
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

app.get("/statistics/:id", (req, res) => {
  if (!authorizationHelper.isUserAuthorized(req, res)) {
    return;
  }
  userController.getUserRecognitionStatistics(req, res);
});

app.put("/update-statistics", (req, res) => {
  if (!authorizationHelper.isUserAuthorized(req, res)) {
    return;
  }
  userController.updateRecognitionStatistics(req, res);
});

app.post("/recognize", (req, res) => {
  if (!authorizationHelper.isUserAuthorized(req, res)) {
    return;
  }
  recognitionController.recognizeFaces(req, res);
});

app.get("/recognitions/:id", (req, res) => {
  if (!authorizationHelper.isUserAuthorized(req, res)) {
    return;
  }
  savedRecognitionsController.getSavedRecognitions(req, res);
});

app.post("/save-recognition", (req, res) => {
  if (!authorizationHelper.isUserAuthorized(req, res)) {
    return;
  }
  savedRecognitionsController.saveRecognition(req, res);
});

app.get("/original-photo", (req, res) => {
  if (!authorizationHelper.isUserAuthorized(req, res)) {
    return;
  }
  savedRecognitionsController.getOriginalPhotoUrl(req, res);
});

app.get("/redirect-original-photo/:code", (req, res) => {
  savedRecognitionsController.redirectToOriginalPhoto(req, res);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}...`);
});
