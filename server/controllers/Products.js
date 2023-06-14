// const productSchema = require('../model/Products.js')

// exports.Postproducts = async(req,res) =>{
//     const product = req.body;
//     await productSchema.insertMany(product);
//     res.send("products data saved to DB.")
// }
// exports.getAllP=()
// await productSchema.find;
const express = require("express");
const router = express.Router();
const productSchema = require('../model/Products.js');


exports.Postproducts = async (req, res) => {
  const product = req.body;
  await productSchema.insertMany(product);
  res.send("Products data saved to DB.");
};


exports.getAllProducts = async (req, res) => {
  try {
      console.log('ok');
      const products = await productSchema.find();
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getProductById = async (req, res) => {
  try {
      const { id } = req.params;
      const product = await productSchema.findById(id);
      console.log(product);
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};


exports.getProductsByCategory = async (req, res) => {
  try {
      const { category } = req.params;
      const products = await productSchema.find({ category });
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

router.post('/', exports.Postproducts);
router.get('/products', exports.getAllProducts);
router.get('/products/:id', exports.getProductById);
router.get('/products/:category', exports.getProductsByCategory);

module.exports = router;