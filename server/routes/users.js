const express = require("express");
const router = express.Router();

const {
  getUserDetails,
  postCartProducts,
  getCartProducts,
  deleteCartProducts,
  getFavProducts,
  postFavProducts,
  deletFavProducts,
} = require("../controllers/users");

router.get("/", getUserDetails);

router.get("/cart", getCartProducts);
router.post("/cart", postCartProducts);
router.delete("/cart", deleteCartProducts);

router.get("/favorites", getFavProducts);
router.post("/favorites", postFavProducts);
router.delete("/favorites", deletFavProducts);
