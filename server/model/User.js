const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true, maxlength: 35 },
    lastName: { type: String, required: true, trim: true, maxlength: 35 },
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
      trim: true,
      minlength: [6, "password must have atleast six(6) characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain atleast 1 uppercase letter, 1 lowercase letter, 1 number and a special character",
      ],
    },
  },
  { timestamps: true }
);

// encrypting password before saving
userSchema.pre('save', async function(next){
  if(!this.isModified('password')){
    next()
  }
  this.password = await bcrypt.hash(this.password, 10);
});

// verify password
userSchema.methods.comparePassword = async function(yourPassword){
  return await bcrypt.compare(yourPassword, this.password);
}

// get the token
userSchema.methods.jwtGenerateToken = function(){
  return jwt.sign({id: this.id}, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
}

module.exports = mongoose.model("User", userSchema);
