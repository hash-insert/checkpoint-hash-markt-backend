const express = require("express");
const router = express.Router();

const {signin} = require('../controllers/auth');
const {signup} = require('../controllers/auth')

router.post('/signin',signin);
router.post('/signup', signup)


module.exports = router;