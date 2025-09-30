import express from "express";
import { getFood,getFoodbyId} from "../controller/FoodCtrl/food.js";

const router = express.Router();

// Example route
router.get("/getFood",getFood)
router.get("/getFood/:id",getFoodbyId)

export default router;