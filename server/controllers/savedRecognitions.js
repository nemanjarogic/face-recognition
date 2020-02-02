const validUrl = require("valid-url");
const shortid = require("shortid");
const { db } = require("../db/dbConnection");
const { getSavedUserRecognitions } = require("../db/dbModelConverter");

const getSavedRecognitions = (req, res) => {
  return db
    .select("*")
    .from("recognitions")
    .where({ user_id: req.params.id })
    .then(recognitions => {
      //Alternative approach for short URL mapping can be achieved with installation of Nginx server and by changing default configuration
      res.json(getSavedUserRecognitions(recognitions));
    })
    .catch(err =>
      res
        .status(400)
        .json("An error occurred while retrieving saved recognitions.")
    );
};

const saveRecognition = (req, res) => {
  const userId = req.body.user.id;
  const { description, photoUrl } = req.body;

  if (!validUrl.isUri(photoUrl)) {
    return res.status(401).json("Invalid original URL.");
  }

  isOriginalUrlSaved(photoUrl, userId)
    .then(isPhotoSaved => {
      if (isPhotoSaved) {
        return res.json("Given photo URL is already saved for user.");
      }

      //Alternative approach would be code generation by encoding and decoding integer primary key to base62
      const shortCode = shortid.generate();
      const recognition = {
        description,
        original_photo_url: photoUrl,
        user_id: userId,
        short_code: shortCode,
        short_photo_url: process.env.BASE_SHORT_URL + shortCode,
        created_time: new Date()
      };

      return insertRecognitionToDb(recognition, res);
    })
    .catch(err =>
      res.status(400).json("An error occurred while saving recognition.")
    );
};

const isOriginalUrlSaved = (originalPhotoUrl, userId) => {
  return db
    .select("*")
    .from("recognitions")
    .where({
      original_photo_url: originalPhotoUrl,
      user_id: userId
    })
    .then(recognitions => {
      return recognitions.length > 0;
    });
};

const insertRecognitionToDb = (recognition, res) => {
  return db("recognitions")
    .insert(recognition)
    .then(() => res.json("Recognition is successfully saved to database."))
    .catch(err =>
      res
        .status(400)
        .json("An error occurred while adding recognition to database.")
    );
};

module.exports = {
  getSavedRecognitions,
  saveRecognition
};
