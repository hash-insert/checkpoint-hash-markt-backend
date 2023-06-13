const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    favorites: {
      type: [
        {
          id: Number,
          title: String,
          price: Number,
          description: String,
          category: String,
          image: String,
          rating: {
            rate: Number,
            count: Number,
          },
        },
      ],
      required: true,
    },
    cart_items: {
      type: [
        {
          id: Number,
          title: String,
          price: Number,
          description: String,
          category: String,
          image: String,
          rating: {
            rate: Number,
            count: Number,
          },
        },
      ],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };
