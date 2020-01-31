const bcrypt = require("bcrypt");
const { convertDatabaseUser } = require("../helpers/dbModelConverter");

const handleLogIn = (req, res, db) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Invalid form submission");
  }

  db.select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      bcrypt.compare(password, data[0].hash, function(
        bcryptError,
        isPasswordValid
      ) {
        if (isPasswordValid) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", email)
            .then(user => {
              const returnUser = convertDatabaseUser(user[0]);
              returnUser.token = "fake-jwt-token";
              res.json(returnUser);
            })
            .catch(err =>
              res.status(400).json("Connection error. Please try again later.")
            );
        } else {
          res.status(400).json("Incorrect username or password.");
        }
      });
    })
    .catch(err => {
      console.log("An error occurred while handling user log in.");
      console.log(err);
      res.status(400).json("An error occurred. Please try again later.");
    });
};

module.exports = {
  handleLogIn: handleLogIn
};
