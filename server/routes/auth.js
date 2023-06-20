const express = require("express");
const router = express.Router();

const {signin} = require('../controllers/auth');
const {signup} = require('../controllers/auth'); 
const {logout} = require('../controllers/auth'); 

router.post('/signin',signin);
router.post('/signup',signup);
router.get('/logout',logout);


module.exports = router;