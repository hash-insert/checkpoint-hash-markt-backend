const User = require("../model/User");

const signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    console.log("req body", req.body);
    const userExist = await User.findOne({email});
    if (userExist) {
      return res.status(409).json({ success: false, message: 'User already exists' });
    }
    const user = await User.create(req.body);
    res.status(201).json({ success: true, user });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const signin = async(req, res, next) => {
  try{
    const {email, password} = req.body;
    if(!email || !password){
      return res.status(409).json({ success: false, message: 'Email and password are required' });
    }
    // check user email
    const user = await User.findOne({email});
    if(!user){
      return res.status(409).json({ success: false, message: 'Invalid credentials!' });
    }

    // verify user password
    const isMatched = await user.comparePassword(password);
    if(!isMatched){
      return res.status(409).json({ success: false, message: 'Invalid credentials!' });
    }

    generateToken(user, 200, res);
  }
  catch(error){
    console.log(error);
    return res.status(409).json({ success: false, message: 'cannot login, check your credentials' });
  }
}

const generateToken = async (user, statusCode, res) => {
  const token = await user.jwtGenerateToken();
  const expireToken = parseInt(process.env.EXPIRE_TOKEN);
  const options = {
    httpOnly: true,
    expires: new Date(Date.now() + expireToken)
  };
  res
  .status(statusCode)
  .cookie('token', token, options)
  .json({success: true, token})
}

const logout = (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: "Loggged out"
  })
}

module.exports = { signin, signup, logout };
