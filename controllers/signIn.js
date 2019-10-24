const handleSignIn = (req, res, db, bcrypt, mapDatabaseUserToDto) => {
    db.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            bcrypt.compare(req.body.password, data[0].hash, function(bcryptError, isPasswordValid) {
                if(isPasswordValid) {
                    return db.select('*').from('users')
                        .where('email', '=', req.body.email)
                        .then(user => res.json(mapDatabaseUserToDto(user[0])))
                        .catch(err => res.status(400).json('Unable to get user'))
                } else {
                    res.status(400).json('Wrong credentials');
                }
            });
        })
        .catch(err => res.status(400).json('Wrong credentials'))
};


module.exports = {
    handleSignIn: handleSignIn
};