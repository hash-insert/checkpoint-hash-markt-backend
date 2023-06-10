const { Product } = require("../model/Product");

const addMultipleProducts = async (req, res) => {
  try {
    let products = await Product.insertMany(req.body.data);
    res.json({ msg: products });
  } catch (error) {
    res.json({ error: `error in addMultipleProducts->${error}` });
  }
};

const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find({});
    res.status(200).json({ data: products });
  } catch (error) {
    res.json({ err: `error in getAllProducts -> ${error}` });
  }
};

const getProduct = async (req, res) => {
  try {
    let product = await Product.findOne({ _id: req.params.id });
    res.status(200).json({ data: product });
  } catch (error) {
    res.json({ err: `error in getProduct -> ${error}` });
  }
};

const getProductByCategory = async (req, res) => {
  const { category } = req.params;
  console.log(category);
  try {
    let product = await Product.find({ category });
    res.status(200).json({ data: product });
  } catch (error) {
    res.json({ err: `error in getProductByCategory -> ${error}` });
  }
};

module.exports = {
  addMultipleProducts,
  getAllProducts,
  getProduct,
  getProductByCategory,
};
