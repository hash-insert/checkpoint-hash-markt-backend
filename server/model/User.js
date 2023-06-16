const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 35
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favorites: {
        type: [Number],
        required: true,
      },
      cart_items: {
        type: [Number],
        required: true,
      },
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);