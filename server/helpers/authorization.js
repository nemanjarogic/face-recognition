const isUserAuthorized = (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || authorization !== "Bearer fake-jwt-token") {
    res.status(401).json("Unauthorized access to data.");
    return false;
  }

  return true;
};

module.exports = {
  isUserAuthorized
};
