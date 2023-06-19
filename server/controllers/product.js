const Product = require("../model/Products");

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, price, description, category, image, rating } = req.body;
    const product = await Product.create({ title, price, description, category, image, rating });
    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const products = await Product.find({ category: category });
    if (products.length === 0) {
      return res.status(404).json({ success: false, message: "No products found in the specified category" });
    }
    res.json({ success: true, products });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};