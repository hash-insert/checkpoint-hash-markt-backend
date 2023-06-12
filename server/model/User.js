const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // remove space from end & an begining if have
      required: true,
      maxlength: 35,
    },
    
    email:{
      type:email,
      required:true
    },
    password: {
      type:String,
      required:true
    }
  },
  
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
