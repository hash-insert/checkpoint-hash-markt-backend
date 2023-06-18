const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true, // remove space from end & an begining if have
      required: false,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
