# Face Recognition - server

Server for 'Face Recognition' web application that uses [Clarafai API](https://docs.clarifai.com/api-guide/predict) to detect a face in the picture. Server is developed using Node.js and Express.js with connection to a PostgreSQL database. 

## Features
* Sign in and register user
* Detect multiple faces in the submitted picture
* Keep track for number of submitted pictures for every user 

![alt text](https://i.imgur.com/7CQxhyD.png "Face Recognition")

## How to run

__Make sure that Node.js, NPM and Express.js are installed__

1) Install the dependencies using `npm install`
2) Create face-recognition PostgreSQL database 
3) Initialize 'login' and 'users' table in database using scripts in /postgresql folder on the server
4) Configure database connection in server.js
5) Register to [Clarafai](https://www.clarifai.com/) and change limited API key
6) Run `npm start`
7) Start 'Face Recognition' [front-end](https://github.com/nemanjarogic/face-recognition)

### To-do

This web application is created for specific educational purposes, so many features such as profile view, advanced validation etc. can be added to improve user experience and codebase.
