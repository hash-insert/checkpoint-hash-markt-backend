const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true, // remove space from end & an begining if have
      required: true,
      maxlength: 35,
    },
    email: {
      type : String,
      required: true,
    },
    password: {
      type: String,
      required:true
    },
    favorites: {
      type: Array,
      required:true
    },
    cartitems: {
      type: Array,
      required:true
    }
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
