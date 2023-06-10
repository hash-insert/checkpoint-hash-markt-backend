const { User } = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const { BadRequest } = require("../middlewares/customError");
const signupSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(18),
});
const loginSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6).max(18),
});
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const { error } = await signupSchema.validateAsync(req.body);
    if (error) {
      throw new BadRequest(error.details[0].message, 400);
    }
    const checkUser = await User.findOne({ email: email });

    if (checkUser) {
      throw new BadRequest("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };

    const createUser = await User.create(newUser);
    return res.json(createUser);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { error } = await loginSchema.validateAsync(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    return res.status(200).json({ message: "Logged in successfully" });
  } catch (error) {
    res.status(500).json({ error: `Error in login: ${error}` });
  }
};

const logout = async (req, res) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json({ message: "Successfully logged out" });
  } catch (error) {
    res.status(500).json({ error: `Error in logout: ${error}` });
  }
};
module.exports = {
  login,
  logout,
  signup,
};
