const bcrypt = require("bcrypt");
const { db } = require("../db/dbConnection");
const { getUser } = require("../db/dbModelConverter");

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
            name,
            email,
            registred_time: new Date()
          })
          .into("users")
          .returning("*")
          .then(users => {
            //Insert first into 'users' table due to foreign key, then after storing hash into 'login' table return user to frontend

            return trx("login")
              .insert({
                hash,
                email
              })
              .then(() => res.json(getUser(users[0])));
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
