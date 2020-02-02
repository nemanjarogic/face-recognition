const { db } = require("../db/dbConnection");

const getSavedRecognitions = (req, res) => {
  console.log("getSavedRecognitions");
  console.log(req);
};

const saveRecognition = (req, res) => {
  console.log("saveRecognition");
  console.log(req);
};

module.exports = {
  getSavedRecognitions,
  saveRecognition
};
