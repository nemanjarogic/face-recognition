const handleRegister = (req, res, db, bcrypt, mapDatabaseUserToDto) => {
    const { email, name, password } = req.body;
   
    if (!email || !name || password) {
        return res.status(400).json('Invalid form submission');
    }

    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            db.transaction(trx => {
                trx.insert({
                    hash,
                    email
                })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            email: loginEmail[0],
                            name,
                            registred_time: new Date()
                        })
                        .then(user => res.json(mapDatabaseUserToDto(user[0])))
                })
                .then(trx.commit)
                .catch(trx.rollback)
            })
            .catch(err => res.status(400).json('Failed to register user'))
        });
    });
};

module.exports = {
    handleRegister: handleRegister
};