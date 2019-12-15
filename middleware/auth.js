const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // get token from header
  const token = req.header("x-auth-token");

  // check if not token
  if (!token) {
    return res.status(401).json({ msg: "No token. Authorization denied" });
  }

  // verify token
  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));

    req.user = decoded.user; // get the user from decoded token
    next(); // next middleware or action
  } catch (error) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
