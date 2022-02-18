const Jwt = require("jsonwebtoken");
const Config = require("config");

module.exports = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  let token;
  let decodedToken;
  try {
    token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "You are not authorized" });
    }
    decodedToken = Jwt.verify(token, Config.get("jwtSecret"));
    req.user = decodedToken;
    next();
  } catch (e) {
    res.status(401).json({ message: "You are not authorized" });
  }
};
