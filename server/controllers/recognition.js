const Clarifai = require("clarifai");
const { db } = require("../db/dbConnection");
const { getRecognitionStatisticsUser } = require("../db/dbModelConverter");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const initializeClarifaiApi = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Unable to work with Clarifai API"));
};

const updateRecognitionStatistics = (req, res) => {
  const { id, recognizedFaces } = req.body;

  db("users")
    .where("id", "=", id)
    .increment("submitted_photos", 1)
    .increment("recognized_faces", Number(recognizedFaces))
    .returning("*")
    .then(updatedUsers => {
      const user = getRecognitionStatisticsUser(updatedUsers[0]);
      res.json(user);
    })
    .catch(err =>
      res
        .status(400)
        .json("An error occurred while updating recognition statistics.")
    );
};

module.exports = {
  initializeClarifaiApi,
  updateRecognitionStatistics
};
