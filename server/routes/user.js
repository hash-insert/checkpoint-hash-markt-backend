const express=require('express');
const router=express.Router();
const {getUserById,getUserCart,addCart,deleteCart,getUserByFavourites,addFavourites,removeItem, removeFav}=require('../controllers/user.js')


router.get('/:id',getUserById);
router.get('/:id/usercart',getUserCart)
router.post('/:id/add/cart',addCart)
router.post('/:id/removeItem', removeItem)
router.post('/:id/deletecart',deleteCart)
router.get('/:id/favourites',getUserByFavourites);
router.post('/:id/favourites',addFavourites)
router.post('/:id/removeFav',removeFav)




module.exports=router;