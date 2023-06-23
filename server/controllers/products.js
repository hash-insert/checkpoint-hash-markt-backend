const Product = require("../model/Products.js");

exports.postProducts = async (req, res) => {
  const productsData = req.body;
  try {
    await Product.insertMany(productsData);
    res.send("added");
  } catch (error) {
    console.log(error);
  }
};

exports.getProducts = async (req, res) => {
  try {
    console.log('products')
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    console.log(error);
  }
};

exports.getById = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findOne({ id: id });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

exports.getByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category: category });
    res.json(products);
  } catch (error) {
    console.log(error);
  }
};

exports.getCategories = async (req, res) => {
  try {
    let data = await Product.distinct("category");
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
