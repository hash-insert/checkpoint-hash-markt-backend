const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value for {PATH}.'
    }
  },
  title: {
    type: String
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  image: {
    type: String,
    format: 'uri'
  },
  rating: {
    type: {
      rate: {
        type: Number
      },
      count: {
        type: Number,
        validate: {
          validator: Number.isInteger,
          message: '{VALUE} is not an integer value for {PATH}.'
        }
      }
    }
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
