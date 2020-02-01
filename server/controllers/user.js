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

const getUserByEmail = email => {
  return db
    .select("*")
    .from("users")
    .where("email", "=", email)
    .then(users => {
      return convertDatabaseUser(users[0]);
    });
};

module.exports = {
  getProfile: getProfile,
  getUserByEmail: getUserByEmail,
  getUserRecognitionStatistics: getUserRecognitionStatistics
};
