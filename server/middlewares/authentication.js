const { Forbidden } = require("./customError");
const jwt = require("jsonwebtoken");

const authorization = (req, res, next) => {
  // console.log("authentication start");
  // console.log(req.url);
  const cookie = req.headers.cookie;
  let token = cookie.split("=")[1];
  // console.log(`token -> ${token}`);
  if (!token) {
    throw new Forbidden("Invalid token");
  }
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = data.userId;
    // console.log(`userId -> ${req.userId}`);
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization };
