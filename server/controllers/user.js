const { db } = require("../db/dbConnection");
const { convertDatabaseUser } = require("../db/dbModelConverter");

const getProfile = (req, res) => {
  db.select("*")
    .from("users")
    .where({ id: req.params.id })
    .then(user => {
      if (user.length) {
        res.json(convertDatabaseUser(user[0]));
      } else {
        res.status(400).json("User not found");
      }
    })
    .catch(err => res.status(400).json("Error getting user"));
};

const getUserByEmail = email => {
  return db
    .select("*")
    .from("users")
    .where("email", "=", email)
    .then(user => {
      return convertDatabaseUser(user[0]);
    });
};

module.exports = {
  getProfile: getProfile,
  getUserByEmail: getUserByEmail
};
