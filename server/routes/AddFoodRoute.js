import express from "express";
import { AddFoodDetails } from "../seedFood.js";
const router = express.Router();

router.post("/addFood", AddFoodDetails);

export default router;
