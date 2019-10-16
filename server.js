const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'apple',
            submitedPhotos: 0,
            registredTime: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'orange',
            submitedPhotos: 0,
            registredTime: new Date()
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
    console.log(req.body);
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
        res.json('Successful authentication...');
    }
    else {
        res.status(400).json('Authentication failure...');
    }
});

app.post('/register', (req, res) => {
    const { email, name,password } = req.body;
    database.users.push({
        id: '125',
        name,
        email,
        password,
        submitedPhotos: 0,
        registredTime: new Date()
    });

    res.json(database.users[database.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const user = getUser(req.params.id);
    if(user !== null) {
        return res.json(user);
    }

    res.status(404).json('Requsted user is not found');
});

app.put('/image', (req, res) => {
    const user = getUser(req.body.id);
    if(user !== null) {
        user.submitedPhotos++;
        return res.json(user.submitedPhotos);
    }

    res.status(404).json('Requsted user is not found');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000...');
});