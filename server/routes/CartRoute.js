import express from "express";

import {
  AddToCart,
  getCartItems,
  updateCartQty,
  Delete,
} from "../controller/CartCtrl/addToCart.js";

const router = express.Router();

router.post("/addToCart/:id", AddToCart);
router.get("/getCartItems", getCartItems);
router.put("/updateCartQty/:id", updateCartQty);
router.delete("/deleteCart/:id", Delete);

export default router;
