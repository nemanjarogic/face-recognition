# Face Recognition

Face Recognition is web application which you can use to recognize multiple faces for specified photo. Application is developed using React, Redux, Node, Express as well as a PostgreSQL database.

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

1. Create face-recognition [PostgreSQL](https://www.postgresql.org/) database
2. Initialize tables in database using scripts in server/db/scripts folder
3. Download [nginx](https://nginx.org/) to map short URL to original URL
4. Open yor `nginx.config` file from nginx/config and add bolded lines
   <pre>
      server {
           listen       80;
           server_name  localhost;<b>
   		location ~* "^/[0-9a-z@]{5,15}$"  {
   			rewrite ^/(.*)$ http://localhost:3001/redirect-original-photo/$1 redirect;
   		}</b>
      }
   </pre>
5. Start nginx
6. Register to [Clarafai](https://www.clarifai.com/) to obtain API key for face recognition
7. Add `.env` file in /server and update configuration
   <pre>
   PORT=3001
   DB_USER=postgresql_user
   DB_PASSWORD=postgresql_password
   DB_NAME=postgresql_db_name
   CLARIFAI_API_KEY=clarafai_api_key_from_step_5
   BASE_SHORT_URL=http://localhost/
   JWT_SECRET_KEY=jwt_secret_key
   </pre>

**Run**

1. Install the dependencies using `npm install`
2. Run `npm start`
