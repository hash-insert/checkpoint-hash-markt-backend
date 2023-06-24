import { findOne, create } from "../model/User";
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
require("dotenv").config();

const signup = async (req, res, next) => {
  try {
    //getting user request
    const { firstName, lastName, email, password } = req.body;
    //checking all the fileds presence
    if (!(firstName && lastName && email && password)) {
      return res.status(401).send("All fields are required");
    }
    //checking for user presence
    const userExist = await findOne({ email });
    if (userExist) {
      return res.status(400).send("email already exists");
    }
    //encrypting password using bcryptjs
    const encryptedPassword = await hash(password, 10);
    //creating new user
    const user = await create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
    });
    //creating and sending token
    const token = sign({ id: user._id, email }, process.env.TOKEN_SECRET);
    user.token = token;
    console.log(user)
    return res.status(201).json({ success: true, user, msg: "signup succesful" });
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
      return res.status(401).send("All fields are required");
    }
    //existing mail or not
    const user = await findOne({ email });
    if (!user) {
      return res.status(404).send("user not found");
    }
    //password checking
    const validUser = await compare(password, user.password);
    if (!validUser) {
      return res.status(400).send("incorrect password");
    }
    //token generation and sending
    const token = sign({ id: user._id }, process.env.TOKEN_SECRET);
    user.token = token;
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expired: new Date(Date.now()) + 24 * 60 * 60 * 1000,
      })
      .json({ success: true, user, msg: "login succesful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const logout = (req, res, next) => {
  localStorage.clear()
  res.clearCookie("access_token");
  res.status(200).json({ success: true, msg: "logout succesful" });
};

export default { signup, login, logout };
