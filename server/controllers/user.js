const { db } = require("../db/dbConnection");
const {
  convertDatabaseUser,
  getRecognitionStatisticsUser
} = require("../db/dbModelConverter");

const getProfile = (req, res) => {
  db.select("*")
    .from("users")
    .where({ id: req.params.id })
    .then(users => {
      if (!users.length) {
        return res.status(400).json("User not found");
      }

      res.json(convertDatabaseUser(users[0]));
    })
    .catch(err =>
      res.status(400).json("An error occurred while retrieving user data.")
    );
};

const getUserByEmail = email => {
  return db
    .select("*")
    .from("users")
    .where("email", "=", email)
    .then(users => {
      return convertDatabaseUser(users[0]);
    });
};

const getUserRecognitionStatistics = (req, res) => {
  db.select("*")
    .from("users")
    .where({ id: req.params.id })
    .then(users => {
      if (!users.length) {
        return res.status(400).json("User not found");
      }

      res.json(getRecognitionStatisticsUser(users[0]));
    })
    .catch(err =>
      res
        .status(400)
        .json("An error occurred while retrieving user recognition statistics.")
    );
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
  getProfile: getProfile,
  getUserByEmail: getUserByEmail,
  getUserRecognitionStatistics: getUserRecognitionStatistics,
  updateRecognitionStatistics: updateRecognitionStatistics
};
