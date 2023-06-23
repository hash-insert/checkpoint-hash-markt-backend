const express = require('express');

const router = express.Router();

const { getUserById, updateUserById,getCartById,addToCartById,deleteFromCartById,getFavoritesById,addToFavoritesById,deleteFromFavoritesById } = require('../controllers/user');

router.get('/:id', getUserById);
router.get('/:id/cart', getCartById);
router.post('/:id/cart', addToCartById);
router.delete('/:id/cart/:productId', deleteFromCartById);
router.get('/:id/favorites', getFavoritesById);
router.post('/:id/favorites', addToFavoritesById);
router.delete('/:id/favorites/:productId', deleteFromFavoritesById);
router.put('/:id', updateUserById);

module.exports = router;