const express = require("express");

const router = express.Router();

const { getAllProducts, createProduct, getProductById, getProductsByCategory } = require("../controllers/products");

router.get("/", getAllProducts);
router.post("/", createProduct);
router.get("/:id", getProductById);
router.get("/category/:category", getProductsByCategory);

module.exports = router;