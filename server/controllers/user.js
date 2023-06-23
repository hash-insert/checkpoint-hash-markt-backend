const User = require("../model/User.js");

exports.getUserById = async (req, res) => {
  console.log("in get");
  let id = req.params.id;
  let data = await User.findOne({ _id: id });
  res.json(data);
};
exports.getUserCart = async (req, res) => {
  console.log("in cart");
  let id = req.params.id;
  let user = await User.findOne({ _id: id });
  res.json(user.cart_items);
};
exports.removeItem = async (req, res) => {
  let id = req.params.id;
  let product = req.body;

  let user = await User.findOne({ _id: id });
  if (user) {
    user.cart_items = user.cart_items.filter(
      (item) => item._id !== product._id
    );
  }
  await user.save();
  res.json(user.cart_items);
};
exports.addCart = async (req, res) => {
  console.log("in save");
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

exports.deleteCart = async (req, res) => {
  console.log("in delete");
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

exports.getUserByFavourites = async (req, res) => {
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

exports.addFavourites = async (req, res) => {
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
exports.removeFav = async(req,res)=>{
  let id = req.params.id;
  let product = req.body;
  console.log(product)
  try{
    let user = await User.findOne({_id:id})
    console.log(user.favourites)
    if(user){
      user.favourites = user.favourites.filter((item)=> item._id !== product._id )
    }
    await user.save();
      console.log(user.favourites)
    res.json(user.favourites);
  }catch(err){
    res.json(err)
  }
}

