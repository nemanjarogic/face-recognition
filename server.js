const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgresql',
      database : 'face-recognition'
    }
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'password',
            submitedPhotos: 0,
            registredTime: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'password',
            submitedPhotos: 0,
            registredTime: new Date()
        }
    ],
    login: [
        {
            id: '123',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
}

const getUser = (id) => {
    for (let i = 0; i < database.users.length; i++) {
        const user = database.users[i];
        if (user.id === id) {
            return user;
        }
    }

    return null;
};

app.get('/', (req, res) => {
    res.json(database.users);
});

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    }
    else {
        res.status(400).json('error');
    }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    bcrypt.hash(password, null, null, function(err, hash) {
        console.log(hash);
    });
    
    db('users')
        .returning('*')
        .insert({
            email,
            name,
            registred_time: new Date()
        })
        .then(user => {
            res.json(user[0]);
        })
        .catch(err => res.status(400).json('Failed to register user'));
});

app.get('/profile/:id', (req, res) => {
    db.select('*').from('users').where({id: req.params.id})
        .then(user => {
            if(user.length) {
                res.json(user[0]);
            }
            else {
                res.status(400).json('User not found');
            }
            
        })
        .catch(err => res.status(400).json('Error getting user'));
    
});

app.put('/image', (req, res) => {
    const user = getUser(req.body.id);
    if(user !== null) {
        user.submitedPhotos++;
        return res.json(user.submitedPhotos);
    }

    res.status(404).json('Requsted user is not found.');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});