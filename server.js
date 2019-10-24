const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgresql',
      database : 'face-recognition'
    }
});



const mapDatabaseUserToDto = (dbUser) => {
    return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        submittedPhotos: dbUser.submitted_photos,
        registredTime: dbUser.registred_time
    };
};

app.get('/', (req, res) => { res.json('Home page') });

app.post('/signin', (req, res) => { signIn.handleSignIn(req, res,db, bcrypt, mapDatabaseUserToDto)});

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt, mapDatabaseUserToDto) });

app.get('/profile/:id', (req, res) => { profile.getProfile(req, res, db, mapDatabaseUserToDto) });

app.put('/image', (req, res) => { image.updateSubmittedPhotos(req, res, db) });

app.post('/imageUrl', (req, res) => { image.initializeClarifaiApi(req, res) });

app.listen(3001, () => {
    console.log('Server is running on port 3001...');
});