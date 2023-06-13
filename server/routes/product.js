const express=require('express');
const router=express.Router();
const {postProducts,getProducts,getById,getByCategory}=require('../controllers/products.js')


router.post('/',postProducts)
router.get('/products',getProducts)
router.get('/products/:id',getById);
router.get('/products/:category',getByCategory)
module.exports=router;
