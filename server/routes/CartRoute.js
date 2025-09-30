import express from "express";

import {
  addToCart,
  getCartItems,
  updateCartQty,
  deleteCartItem,
} from "../controller/CartCtrl/addToCart.js";

const router = express.Router();

router.post("/addToCart/:id", addToCart);
router.get("/getCartItems", getCartItems);
router.put("/updateCartQty/:id", updateCartQty);
router.delete("/deleteCart/:id", deleteCartItem);

export default router;
