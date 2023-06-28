const { Product } = require("../model/Product");

const addMultipleProducts = async (req, res, next) => {
  try {
    let products = await Product.insertMany(req.body.data);
    res.status(201).json({ msg: products });
  } catch (error) {
    next(error);
  }
};

const getAllProducts = async (req, res, next) => {
  try {
    let products = await Product.find({});
    res.status(200).json({ data: products });
  } catch (error) {
    next(error);
  }
};

const getProduct = async (req, res, next) => {
  const {id} = req.params;
  try {
    let product = await Product.findOne({ _id: id });
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

const getProductByCategory = async (req, res, next) => {
  const { category } = req.params;
  try {
    let product = await Product.find({ category });
    res.status(200).json({ data: product });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMultipleProducts,
  getAllProducts,
  getProduct,
  getProductByCategory,
};
