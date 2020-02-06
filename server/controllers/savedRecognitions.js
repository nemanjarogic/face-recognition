const validUrl = require("valid-url");
const shortid = require("shortid");
const { db } = require("../db/dbConnection");
const { getSavedUserRecognitions } = require("../db/dbModelConverter");

const getOriginalPhotoUrl = (req, res) => {
  const { shortCode, userId } = req.query;
  if (!shortCode || !userId) {
    return res
      .status(400)
      .json(
        "Short code and user ID are required for retrieving original photo URL."
      );
  }

  return db
    .select("*")
    .from("recognitions")
    .where({
      short_code: shortCode,
      user_id: userId
    })
    .then(recognitions => {
      if (!recognitions.length) {
        return res
          .status(400)
          .json("Photo with given short code doesn't exist.");
      }

      return res.json(recognitions[0].original_photo_url);
    })
    .catch(err => {
      res
        .status(400)
        .json("An error occurred while retrieving original photo URL.");
    });
};

const redirectToOriginalPhoto = (req, res) => {
  const { code } = req.params;
  if (!code) {
    return res
      .status(400)
      .json("Short code is required for retrieving original photo URL");
  }

  return db
    .select("*")
    .from("recognitions")
    .where({ short_code: code })
    .then(recognitions => {
      if (!recognitions.length) {
        return res
          .status(400)
          .json("Photo with given short code doesn't exist.");
      }

      return res.redirect(recognitions[0].original_photo_url);
    })
    .catch(err => {
      res
        .status(400)
        .json("An error occurred while retrieving original photo URL.");
    });
};

const getSavedRecognitions = (req, res) => {
  return db
    .select("*")
    .from("recognitions")
    .where({ user_id: req.params.id })
    .then(recognitions => {
      return res.json(getSavedUserRecognitions(recognitions));
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
        return res.json("Photo is already saved in user profile.");
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
  saveRecognition,
  getOriginalPhotoUrl,
  redirectToOriginalPhoto
};
