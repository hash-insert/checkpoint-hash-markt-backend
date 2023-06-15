const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signup = async (req, res, next) => {
  try {
    //getting user request
    const { firstName, lastName, email, password } = req.body;
    //checking all the fileds presence
    if (!(firstName && lastName && email && password)) {
      res.status(401).send("All fields are required");
    }
    //checking for user presence
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).send("email already exists");
    } else {
      //encrypting password using bcryptjs
      const encryptedPassword = await bcrypt.hash(password, 10);
      //creating new user
      const user = await User.create({
        firstName,
        lastName,
        email,
        password: encryptedPassword,
      });
      //creating and sending token
      const token = jwt.sign({ id: user._id, email }, process.env.TOKEN_SECRET);
      user.token = token;
      res.status(201).json({ success: true, user, msg: "signup succesful" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    //getting user request
    const { email, password } = req.body;
    //chechking credentials
    if (!(email && password)) {
      res.status(401).send("All fields are required");
    }
    //existing mail or not
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("user not found");
    }
    //password checking
    const validUser = await bcrypt.compare(password, user.password);
    if (!validUser) {
      res.status(400).send("incorrect password");
    }
    //token generation and sending
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    user.token = token;
    res.cookie("access_token", token, {
      httpOnly: true,
      expired: new Date(Date.now()) + 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ success: true, user, msg: "login succesful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = (req, res, next) => {
  res.clearCookie("access_token");
  res.status(200).json({ success: true, msg: "logout succesful" });
};

module.exports = { signup, login, logout };
