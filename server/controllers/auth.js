const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    return res.status(400).send("Email already exists");
  }

  const name = `${firstName} ${lastName}`;

  try {
    const user = new User({
      name,
      email,
      password,
    });

    const savedUser = await user.save();
    res.status(201).json({ success: true, savedUser });
  } catch (err) {
    res.status(400).send(`Error while signing up: ${err}`);
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(409)
        .json({ message: "Email and password are required" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(409).json({ message: "User not found" });
    }
    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(409).json({ message: "Invalid password" });
    }
    generateToken(user, 200, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();
  const expireToken = 24 * 60 * 60 * 1000;
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + expireToken),
  };
  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

exports.logout = (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({
    success: true,
    message: "Loggged out",
  });
  next();
};