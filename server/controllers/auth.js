const User = require("../model/User");
const JWT = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require("bcryptjs");
const SECRET = process.env.SECRET;

exports.signin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      res.send("Enter all the inputs");
    } else if (await User.findOne({ email })) {
      res.send("User already exists.");
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({
        name: username,
        email: email,
        password: hashedPassword,
      });
      await user.save();
      const token = JWT.sign({ email: email }, SECRET, { expiresIn: "1d" });
      res.cookie("Token", token);
      res.send(token);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = JWT.sign({ email: email }, SECRET, { expiresIn: "1d" });
        res.cookie("Token", token);
        res.send(token);
      } else {
        res.send("Enter password correctly");
      }
    } else {
      res.send("Email does not exist. Sign up now!");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

exports.logout = (req, res) => {
  try {
    res.clearCookie("Token");
    res.send("Logout was successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
};

