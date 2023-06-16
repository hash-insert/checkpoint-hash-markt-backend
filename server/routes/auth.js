const express = require("express");
const router = express.Router();

const {signup, signin, logout} = require('../controllers/auth');

router.post('/signin',signin);
router.post('/signup', signup)
router.get('/logout', logout)

module.exports = router;