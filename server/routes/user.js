import express from "express";
import {
  registerCustomer,
  getCustomerByID,
  getCustomer,
  customerLogin,
  logoutCostumer,
} from "../controllers/user.js";
import {
  getProducts,
  getProdById,
  getProdByCatogory,
  getCartItemsByUserId,
  addItemsToCartById,
  deleteItemfromCart,
  getFavItemsByUserId,
  addFavItems,
  deletefavItems,
} from "../controllers/products.js";

const route = express.Router();

route.post("/signup", registerCustomer);
route.post("/login", customerLogin);
route.post("/logout", logoutCostumer);

route.get("/users", getCustomer);
route.get("/user/:id", getCustomerByID);

route.get("/products", getProducts);
route.get("/products/:id", getProdById);
route.get("/products/:category", getProdByCatogory);
route.get("/:id/cart", getCartItemsByUserId);
route.post("/:id/cart", addItemsToCartById);
route.delete("/:id/cart", deleteItemfromCart);
route.get("/:id/favorites", getFavItemsByUserId);
route.post("/:id/favorites", addFavItems);
route.delete("/:id/favorites", deletefavItems);

export default route;
