const express = require("express");
const router=express.Router();

const {signin}=require('../controllers/auth');
const {login}=require('../controllers/auth');
const {logout}=require('../controllers/auth');

router.post('/signin',signin);
router.post('/login',login);
router.get('/logout',logout);

module.exports=router;