const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 70,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please add a valid email"],
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      // match: [
      //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{6,30}$/,
      //   "Password must be six characters including one uppercase letter, one special character and alphanumeric characters?",
      // ],
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    cart_items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
    console.log("Called before saving the user");
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = async function (password) {
  if (!password) throw new Error("Password is missing, cannot compare!");
  try {
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (err) {
    console.log('Error while comparing password', err.message);
  }
};

userSchema.methods.jwtGenerateToken = function(){
  return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
}

module.exports = mongoose.model("User", userSchema);