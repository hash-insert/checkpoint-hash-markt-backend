const express=require('express');
const router=express.Router();
const {postProducts,getProducts,getById,getByCategory,getCategories}=require('../controllers/products.js')


router.post('/',postProducts)
router.get('/categories',getCategories);
router.get('/products',getProducts)
router.get('/product/:id',getById);
router.get('/products/:category',getByCategory)
module.exports=router;
