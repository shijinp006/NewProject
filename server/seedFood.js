// seedFood.js
import mongoose from "mongoose";
import Food from "./Schema/Food.js";
import { Foods } from "./FoodsData/Foods.js";
import dotenv from "dotenv";
dotenv.config();

export const AddFoodDetails = async (req, res) => {
  const mongoUri = process.env.MONGO_URI;
  // const mongoURI = "mongodb://127.0.0.1:27017/mydatabase";

  if (!mongoUri) {
    return res
      .status(500)
      .json({ message: "MongoDB URI not set in environment variables." });
  }

  try {
    // Connect to MongoDB
    await mongoose.connect(mongoUri, {});
    console.log("MongoDB Connected");

    // Check if collection already has data
    const count = await Food.countDocuments();
    if (count === 0) {
      await Food.insertMany(Foods);
      console.log("Default food data inserted!");
      return res.status(200).json({ message: "Default food data inserted!" });
    } else {
      console.log("Food data already exists.");
      return res.status(409).json({ message: "Food data already exists." });
    }
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return res
      .status(500)
      .json({ message: "MongoDB connection failed", error: err.message });
  } finally {
    // Always disconnect after operation
    await mongoose.disconnect();
  }
};
