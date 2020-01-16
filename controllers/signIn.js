const handleSignIn = (req, res, db, bcrypt, mapDatabaseUserToDto) => {
    const { email, password } = req.body;
   
    if (!email || !password) {
        return res.status(400).json('Invalid form submission');
    }

    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            bcrypt.compare(password, data[0].hash, function(bcryptError, isPasswordValid) {
                if(isPasswordValid) {
                    return db.select('*').from('users')
                        .where('email', '=', email)
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