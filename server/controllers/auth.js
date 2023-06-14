const User = require("../model/User");

exports.signup = async (req, res) => {
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.status(400).send("Email already Exists");
  }
  // Create a new user
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(`Error while signing up: ${err}`);
  }
};

exports.signin = async (req, res) => {
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
    const isMatched = await User.comparePassword(password);
    if (!isMatched) {
      return res.status(409).json({ message: "Invalid password" });
    }
    res.send("Something ");
  } catch (err) {
    console.log(err);
    return res
      .status(409)
      .json({ message: "Cannot login, please ckeck the credentials!" });
  }
};
