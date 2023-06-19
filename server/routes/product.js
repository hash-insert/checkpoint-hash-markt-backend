const express = require("express");
const router = express.Router();

const { getAllProducts, createProduct, getProductById, getProductsByCategory } = require("../controllers/product");

// Route for fetching all products
router.get("/products", getAllProducts);
// Route for creating a new product
router.post("/createproduct", createProduct);
// Route for fetching a product by ID
router.get("/product/:id", getProductById);
// Route for fetching a product by Category
router.get("/product/category/:category", getProductsByCategory);


module.exports = router;