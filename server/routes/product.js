const express=require('express');
const router=express.Router();
const {postProducts}=require('../controllers/products.js')

router.post('/',postProducts)
module.exports=router;
