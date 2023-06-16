const express = require("express");
const { addMultipleProducts } = require("../controllers/products");
const router = express.Router();

router.post("/products", addMultipleProducts);

module.exports = router;