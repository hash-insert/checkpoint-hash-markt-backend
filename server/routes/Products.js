
const express = require("express");
const router = express.Router();
const { Postproducts } = require("../controllers/Products.js");

router.post('/', Postproducts);

module.exports = router;