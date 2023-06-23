const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id:{
      type:String,
      requires:true

    },
    name: {
      type: String,
      trim: true, // remove space from end & an begining if have
      required: true,
      maxlength: 35,
    },
    
    email:{
      type:String,
      required:true
    },
    password: {
      type:String,
      required:true
    },
    favourites:{
      type:[Object],
      required:true

    },
    cart_items:{
      type:[Object],
      required:true 

    }
  },
  
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
