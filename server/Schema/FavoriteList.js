// models/Favorite.js
import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true }, // Product ID
    cart: { type: Boolean, default: false }, // Optional flag
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

export const FavoriteList = mongoose.model("Favorite", favoriteSchema);
