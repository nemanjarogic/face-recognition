var jwt = require("jsonwebtoken");

const isUserAuthorized = (req, res) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.status(401).json("Unauthorized access to data.");
    return false;
  }

  const [bearer, encodedToken] = authorization.split(" ");
  if (bearer !== "Bearer" || !encodedToken) {
    res.status(401).json("Unauthorized access to data.");
    return false;
  }

  try {
    return jwt.verify(encodedToken, process.env.JWT_SECRET_KEY);
  } catch (err) {
    res.status(401).json("Unauthorized access to data.");
    return false;
  }
};

module.exports = {
  isUserAuthorized
};
