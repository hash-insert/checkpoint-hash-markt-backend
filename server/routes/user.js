const express = require("express");
const router = express.Router();

const {
  getUserCart,
  getUserDetails,
  addProductToCart,
  deleteProductFromCart,
  getUserFavorites,
  addFavoriteProduct,
  deleteFavoriteProduct,
  getAllUsers,
} = require("../controllers/user");

// cart
//get all users for testing purpose
router.get("/", getAllUsers);
router.get("/:userId", getUserDetails);
router.get("/:userId/cart", getUserCart);
router.post("/:userId/cart", addProductToCart);
router.delete("/:userId/cart", deleteProductFromCart);

// favorites

router.get("/:userId/favorites", getUserFavorites);
router.post("/:userId/favorites", addFavoriteProduct);
router.delete("/:userId/favorites", deleteFavoriteProduct);

module.exports = router;
