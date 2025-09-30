import express from "express";
import {
  addToFavoriteList,
  getFavoriteList,
  deleteFavoriteItem,
} from "../controller/FavoriteListCtrl/addToFavoriteList.js";

const router = express.Router();

// Correct route with parameter
router.post("/addToFavoriteList/:id", addToFavoriteList);
router.get("/getFavoriteList", getFavoriteList);
router.delete("/deleteFavoriteItem/:id", deleteFavoriteItem);

export default router;
