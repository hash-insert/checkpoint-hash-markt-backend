const express = require("express");
const router = express.Router();

const {
  getUsersById,
  getUserCartById,
  addProductToCart,
  deleteProductFromCart,
  getUserFavoritesById,
  addProductToFavorites,
  deleteProductFromFavorites,
} = require("../controllers/users");



router.get('/user/:id', getUsersById);
router.get('/user/:id/cart', getUserCartById)
router.post('/user/:id/cart', addProductToCart)
router.delete('/user/:id/cart',deleteProductFromCart);
router.get('/user/:id/favorites', getUserFavoritesById)
router.post('/user/:id/favorites', addProductToFavorites)
router.delete('/user/:id/favorites',deleteProductFromFavorites);

module.exports = router;