const { NotFound } = require("../middlewares/customError");
const { User } = require("../model/User");

// cart
const getUserDetails = async (req, res, next) => {
  const { userId } = req.params;
  try {
    let user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      throw new NotFound(`User with ${userId} not found`);
    }
    console.log(`userName -> ${user.name}`);
    res.json({ message: user });
  } catch (error) {
    next(error);
  }
};

const getUserCart = async (req, res, next) => {
  const { userId } = req.params;

  try {
    let user = await User.findOne({ _id: userId });
    let { cart_items } = user;
    res.json({ message: cart_items });
  } catch (error) {
    next(error);
  }
};

const addProductToCart = async (req, res, next) => {
  const { userId } = req.params;

  try {
    let user = await User.findOne({ _id: userId });
    let { cart_items } = user;

    const productData = req.body.data;

    cart_items.push(productData);

    user.cart_items = cart_items;
    await user.save();

    res.json({ message: productData });
  } catch (error) {
    next(error);
  }
};

const deleteProductFromCart = async (req, res, next) => {
  const { userId } = req.params;
  const { productId } = req.body;

  try {
    let user = await User.findOne({ _id: userId });
    let { cart_items } = user;
    let filter = cart_items.filter((item) => item.id !== productId);
    user.cart_items = filter;
    await user.save();

    res.json({ message: filter });
  } catch (error) {
    next(error);
  }
};

// favorites

const getUserFavorites = async (req, res, next) => {
  const { userId } = req.params;

  try {
    let user = await User.findOne({ _id: userId });
    let { favorites } = user;
    res.json({ message: favorites });
  } catch (error) {
    next(error);
  }
};

const addFavoriteProduct = async (req, res, next) => {
  const { userId } = req.params;
  const { data } = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    const { favorites } = user;

    favorites.push(data);

    user.favorites = favorites;
    user.save();

    res.json({ message: favorites });
  } catch (error) {
    next(error);
  }
};

const deleteFavoriteProduct = async (req, res, next) => {
  const { userId } = req.params;
  const { productId } = req.body;
  try {
    let user = await User.findOne({ _id: userId });
    let { favorites } = user;
    let filter = favorites.filter((item) => item.id !== productId);
    user.favorites = filter;
    user.save();
    res.json({ message: filter });
  } catch (error) {
    next(error);
  }
};

// for testing purpose
const getAllUsers = async (req, res, next) => {
  try {
    let users = await User.find({}).select("-password");
    res.json({ message: users });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  getUserCart,
  getUserDetails,
  addProductToCart,
  deleteProductFromCart,
  getUserFavorites,
  addFavoriteProduct,
  deleteFavoriteProduct,
};
