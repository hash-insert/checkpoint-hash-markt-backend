import { Router } from "express";
const router = Router();

import { product, getAllProducts, getProductById, getProductByCategory } from "../controllers/products.js";

router.post("/product", product);
router.get("/getAllProducts", getAllProducts);
router.get("/getProductById", getProductById);
router.get("/getProductByCategory", getProductByCategory);

export default router;