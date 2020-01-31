const { convertDatabaseUser } = require("../helpers/dbModelConverter");

const getProfile = (req, res, db) => {
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

module.exports = {
  getProfile: getProfile
};
