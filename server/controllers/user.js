const User = require('../model/User');

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.cart_items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addToCartById = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.cart_items.push(product_id);
    await user.save();
    res.json({ message: 'Product added to cart successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteFromCartById = async (req, res) => {
  try {
    const { id, productId } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const index = user.cart_items.indexOf(productId);
    if (index > -1) {
      user.cart_items.splice(index, 1);
    }
    await user.save();
    res.json(user.cart_items);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getFavoritesById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addToFavoritesById = async (req, res) => {
  try {
    const { id } = req.params;
    const { product_id } = req.body;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.favorites.push(product_id);
    await user.save();
    res.json({ message: 'Product added to favorites successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteFromFavoritesById = async (req, res) => {
  try {
    const { id, productId } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const index = user.favorites.indexOf(productId);
    if (index > -1) {
      user.favorites.splice(index, 1);
      await user.save();
    }
    res.json({ message: 'Product removed from favorites successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getUserById,
  updateUserById,
  getCartById,
  addToCartById,
  deleteFromCartById,
  getFavoritesById,
  addToFavoritesById,
  deleteFromFavoritesById,
};