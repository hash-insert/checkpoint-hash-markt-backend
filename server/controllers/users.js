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
      return res
        .status(200)
        .json({ success: true, msg: "no items in cart please add some" });
    }
    res.status(200).json({ success: true, cartProducts });
  } catch (error) {
    console.log("error in getting cart products", error);
  }
};

const postCartProducts = async () => {
  let id = req.params.id;
  let product = req.body;
  console.log(product);
  try {
    let user = await User.findOne({ _id: id });
    if (user) {
      user.cart_items.push(product);
      await user.save();
      res.json(user.cart_items);
      return;
    } else {
      res.send("not a user");
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteCartProducts = async () => {
  let id = req.params.id;
  let productId = req.body.itemId;
  console.log(productId);
  try {
    let user = await User.findOne({ _id: id });
    if (user) {
      user.cart_items = user.cart_items.filter((item) => item.id !== productId);
    }
    await user.save();
    res.json(user.cart_items);
  } catch (error) {
    console.log(error);
  }
};

const getFavProducts = async () => {
  let id = req.params.id;
  try {
    let user = await User.findOne({ _id: id });
    if (user) {
      res.json(user.favourites);
    }
  } catch (error) {
    console.log(error);
  }
};

const postFavProducts = async () => {
  let id = req.params.id;
  let product = req.body;
  try {
    let user = await User.findOne({ _id: id });
    if (user) {
      user.favourites.push(product);
      await user.save();
      res.json(user.favourites);
    }
  } catch (error) {
    console.log(error);
  }
};

const deletFavProducts = async () => {
  let id = req.params.id;
  let product = req.body;
  console.log(product);
  try {
    let user = await User.findOne({ _id: id });
    console.log(user.favourites);
    if (user) {
      user.favourites = user.favourites.filter(
        (item) => item._id !== product._id
      );
    }
    await user.save();
    console.log(user.favourites);
    res.json(user.favourites);
  } catch (err) {
    res.json(err);
  }
};

module.exports = {
  getUserDetails,
  postCartProducts,
  getCartProducts,
  deleteCartProducts,
  getFavProducts,
  postFavProducts,
  deletFavProducts,
};
