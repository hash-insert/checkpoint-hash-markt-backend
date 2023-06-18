import  Customer from "../model/user.js";
import  Product from "../model/product.js";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProdById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getProdByCatogory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET cart details of user by id
const getCartItemsByUserId = async (req, res) => {
  try {
    const user = await Customer.findById(req.params.id).populate("cart_items");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.cart_items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST add product to user's cart by id
const addItemsToCartById = async (req, res) => {
  try {
    const user = await Customer.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    user.cart_items.push(product);
    await user.save();
    res.json(user.cart_items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE product from user's cart by id
const deleteItemfromCart = async (req, res) => {
  try {
    const user = await Customer.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const productIndex = user.cart_items.indexOf(req.body.productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
    user.cart_items.splice(productIndex, 1);
    await user.save();
    res.json(user.cart_items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET favorite products of user by id
const getFavItemsByUserId = async (req, res) => {
  try {
    const user = await Customer.findById(req.params.id).populate("favorites");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST add product to user's favorites by id
const addFavItems = async (req, res) => {
  try {
    const user = await Customer.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const product = await Product.findById(req.body.productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    user.favorites.push(product);
    await user.save();
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE product from user's favorites by id
const deletefavItems = async (req, res) => {
  try {
    const user = await Customer.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const productIndex = user.favorites.indexOf(req.body.productId);
    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found in favorites" });
    }
    user.favorites.splice(productIndex, 1);
    await user.save();
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export {
  getProducts,
  getProdById,
  getProdByCatogory,
  getCartItemsByUserId,
  addItemsToCartById,
  deleteItemfromCart,
  getFavItemsByUserId,
  addFavItems,
  deletefavItems,
};
