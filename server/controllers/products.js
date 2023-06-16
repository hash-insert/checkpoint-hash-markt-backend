const { Product } = require("../model/Products");

const addMultipleProducts = async (req, res) => {
  try {
    let products = await Product.insertMany(req.body.data);
    res.json({ msg: products });
  } catch (error) {
    res.json({ error: `error in addMultipleProducts->${error}` });
  }
};

module.exports = { addMultipleProducts };