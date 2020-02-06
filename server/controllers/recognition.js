const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.CLARIFAI_API_KEY
});

const recognizeFaces = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err =>
      res
        .status(400)
        .json("An error occurred during communication with Clarifai API")
    );
};

module.exports = {
  recognizeFaces
};
