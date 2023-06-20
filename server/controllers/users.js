const User = require("../model/User");

// GET /user/:id - Get the user details by id
exports.getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// GET /user/:id/cart - Get the cart details of the user by id
exports.getUserCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, cart: user.cart_items });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// POST /user/:id/cart - Add a product to the cart of the user by id
exports.addProductToCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.cart_items) {
      user.cart_items = []; // Initialize cart_items as an empty array if it doesn't exist
    }
    user.cart_items.push(productId);
    await user.save();
    console.log(user)
    res.json({ success: true, cart: user.cart_items });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE /user/:id/cart - Delete a product from the cart of the user by id
exports.deleteProductFromCart = async (req, res) => {
    try {
      const { id } = req.params;
      const { productId } = req.body;
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      
      user.cart_items = user.cart_items.filter((item) => item.toString() !== productId);
      await user.save();
      res.json({ success: true, message: "Product successfully deleted from cart" });
    } catch (err) {
      res.status(400).json({ success: false, error: err.message });
    }
  };

// GET /user/:id/favorites - Get the favorite products of the user by id
exports.getUserFavoritesById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// POST /user/:id/favorites - Add a product to the favorites of the user by id
exports.addProductToFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.favorites.push(productId);
    await user.save();
    res.json({ success: true, favorites: user.favorites });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// DELETE /user/:id/favorites - Delete a product from the favorites of the user by id
exports.deleteProductFromFavorites = async (req, res) => {
  try {
    const { id } = req.params;
    const { productId } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.favorites = user.favorites.filter((item) => item.toString() !== productId);
    await user.save();
    res.json({ success: true, message: "Product successfully deleted from favorites" });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
