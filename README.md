# Face Recognition

Face Recognition is web application that uses [Clarafai API](https://docs.clarifai.com/api-guide/predict) to detect a face in a picture. Application is developed using React.js for the front-end. 
Node.js and Express.js are used for the back-end, as well as a PostgreSQL database. 

## Features
* Sign in and register user
* Detect multiple faces in the submitted picture
* Keep track for number of submitted pictures for every user 
* Add, remove and update recipe ingredients in shopping list
* Data persistence on page refresh for favourite receipes and shopping list

![alt text](https://i.imgur.com/7CQxhyD.png "Face Recognition")

## How to run

__Make sure that Node.js and NPM are installed__

1) Install the dependencies using `npm install`
2) Run `npm start`
3) Be sure that [server](https://github.com/nemanjarogic/face-recognition-server) is successfully initialized
