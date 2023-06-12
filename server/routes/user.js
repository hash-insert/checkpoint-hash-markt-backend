import express from "express";
import {
  registerCustomer,
  getCustomerByID,
  getCustomer,
  customerLogin,
  logoutCostumer,
} from "../controllers/user.js";

const route = express.Router();

route.post("/signup", registerCustomer);
route.post("/login",customerLogin)
route.post("/logout",logoutCostumer)

route.get("/users", getCustomer);
route.get("/user/:id", getCustomerByID);

export default route;
