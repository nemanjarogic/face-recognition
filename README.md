# Face Recognition

Face Recognition is web application which you can use to recognize multiple faces for the specified photo. Application is developed using React, Redux, Node, Express as well as a PostgreSQL database.

## Features

- Sign up and login (supported validation, JWT and password hashing)
- Detect multiple faces in submitted photo
- Keep track for number of submitted photo and number of recognized faces for every user
- Save and reuse recognized faces from user profile
- Custom URL shortener for saved recognitions

![alt text](https://github.com/nemanjarogic/face-recognition/blob/master/client/src/assets/images/github.png "Face Recognition")

## How to run

Make sure that Node.js and NPM are installed

**Prerequisite**

1. Create face-recognition PostgreSQL database
2. Initialize tables in database using scripts in server/db/scripts folder
3. Download nginx to map short URL to original URL (https://nginx.org/)
4. Open yor `nginx.config` file from nginx/config and add bolded lines
   `server { listen 80; server_name localhost; **location ~* "^/[0-9a-z@]{5,15}$" { rewrite ^/(.*)$ http://localhost:3001/redirect-original-photo/$1 redirect; } ** }`
5. Register to [Clarafai](https://www.clarifai.com/) and change limited API key
6. Run `npm start`

**Run**

1. Install the dependencies using `npm install`
2. Run `npm start`
