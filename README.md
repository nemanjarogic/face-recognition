# Face Recognition

Face Recognition is web application that uses [Clarafai API](https://docs.clarifai.com/api-guide/predict) to detect a face in the picture. Application is developed using React.js for the front-end. 
Node.js and Express.js are used for the back-end, as well as a PostgreSQL database. 

## Features
* Sign in and register user
* Detect multiple faces in the submitted picture
* Keep track for number of submitted pictures for every user 

![alt text](https://i.imgur.com/7CQxhyD.png "Face Recognition")

## How to run

Make sure that Node.js and NPM are installed

__Backend__

1) Install the dependencies using `npm install`
2) Create face-recognition PostgreSQL database 
3) Initialize 'login' and 'users' table in database using scripts in /postgresql folder on the server
4) Configure database connection in server.js
5) Register to [Clarafai](https://www.clarifai.com/) and change limited API key
6) Run `npm start`

__Frontend__

1) Install the dependencies using `npm install`
2) Run `npm start`

### To-do

This web application is created for specific educational purposes, so many features such as profile view, advanced validation etc. can be added to improve user experience and codebase.

