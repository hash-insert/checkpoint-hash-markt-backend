const express = require("express");
const {
  addMultipleProducts,
  getAllProducts,
  getProduct,
  getProductByCategory,
} = require("../controllers/products");
const router = express.Router();

router.post("/products", addMultipleProducts);
router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.get("/products/:category", getProductByCategory);

module.exports = router;
