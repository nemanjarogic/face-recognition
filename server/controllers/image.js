const Clarifai = require("clarifai");
const { db } = require("../db/dbConnection");

// Sensitive data should never be saved like this in production
const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const initializeClarifaiApi = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Unable to work with Clarifai API"));
};

const updateSubmittedPhotos = (req, res) => {
  const { id } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("submitted_photos", 1)
    .returning("submitted_photos")
    .then(submittedPhotos => {
      res.json(submittedPhotos[0]);
    })
    .catch(err => res.status(400).json("Unable to return submitted photos"));
};

module.exports = {
  updateSubmittedPhotos,
  initializeClarifaiApi
};
