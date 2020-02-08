const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const { db } = require("../db/dbConnection");
const { getUserByEmail } = require("./user");

const handleLogIn = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json("Email and password are required for login.");
  }

  checkCredentials(email, password)
    .then(isRequestValid => {
      if (!isRequestValid) {
        return res.status(400).json("Incorrect username or password.");
      }

      return getUserByEmail(email).then(user => {
        user.token = jwt.sign(
          {
            data: email
          },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );

        res.json(user);
      });
    })
    .catch(err => {
      console.log("An error occurred while handling user log in.");
      console.log(err);
      res.status(400).json("An error occurred. Please try again later.");
    });
};

const checkCredentials = (email, password) => {
  return db
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      return bcrypt.compare(password, data[0].hash);
    });
};

module.exports = {
  handleLogIn: handleLogIn
};
