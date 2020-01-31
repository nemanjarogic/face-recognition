const bcrypt = require("bcrypt");
const { db } = require("../db/dbConnection");
const { convertDatabaseUser } = require("../db/dbModelConverter");

const handleSignUp = (req, res) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res
      .status(400)
      .json("Name, email and password are required for sign up.");
  }

  const saltRounds = 10;

  bcrypt
    .genSalt(saltRounds)
    .then(salt => bcrypt.hash(password, salt))
    .then(hash => {
      db.transaction(trx => {
        trx
          .insert({
            hash,
            email
          })
          .into("login")
          .returning("email")
          .then(loginEmail => {
            return trx("users")
              .returning("*")
              .insert({
                email: loginEmail[0],
                name,
                registred_time: new Date()
              })
              .then(user => res.json(convertDatabaseUser(user[0])));
          })
          .then(trx.commit)
          .catch(err => {
            res.status(400).json("An error occurred. Please try again later.");
            trx.rollback();
          });
      });
    })
    .catch(err => {
      console.log("An error occurred while handling user sign up.");
      console.log(err);
      res.status(400).json("An error occurred. Please try again later.");
    });
};

module.exports = {
  handleSignUp: handleSignUp
};
