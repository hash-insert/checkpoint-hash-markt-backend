const User = require("../model/User");

const getUserDetails = async (req, res) => {
  try {
    const userDetails = await User.findOne({ _id: req.params.id });
    if (!userDetails) {
      return res.status(400).json({ success: false, msg: "user not found" });
    }
    res.status(200).json({ success: true, userDetails });
  } catch (error) {
    console.log("error in getting the user details", error);
  }
};

const getCartProducts = async (req, res) => {
  try {
    const cartProducts = await User.find(cart_items);
    if (cartProducts.length === 0) {
      return res.status(200).json({ success: true, msg: "no items in cart please add some" });
    }
    res.status(200).json({ success: true, cartProducts });
  } catch (error) {
    console.log("error in getting cart products", error);
  }
};

const postCartProducts = async () => {
  
};

const deleteCartProducts = async () => {};

const getFavProducts = async () => {};

const postFavProducts = async () => {};

const deletFavProducts = async () => {};

module.exports = {
  getUserDetails,
  postCartProducts,
  getCartProducts,
  deleteCartProducts,
  getFavProducts,
  postFavProducts,
  deletFavProducts,
};
