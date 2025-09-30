// models/Cart.js
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, // Product ID
  cart: { type: Boolean, default: false }, // always true when added
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);


