const jwtToken = require("jsonwebtoken");
const gCloud = require("_helpers/SecretManager");

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];
  if (token == null) {
    return res.status(401).json({
      headers: req.headers,
      message: "Unauthorized access is prohibited. Token is missing",
    });
  }

  gCloud
    .getSecret("freshcart-jwt-secret")
    .then((secret) => {
      jwtToken.verify(token, secret, (err, user) => {
        if (err) {
          return res.status(403).json(err);
        }
        req.user = user;
        next();
      });
    })
    .catch((error) => {
      console.log("Error in fetching JWT secret: ", error);
      return res.status(503).json(error);
    });
};

module.exports = verifyToken;
