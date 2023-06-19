const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true, // remove space from end & an begining if have
      required: true,
      // maxlength: 35,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      // maxlength: 35,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    token: {
      type: String,
    },
    favorites: {
      type : [Number],
      required : true

    },
    cart_items: {
      type : [Number],
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

