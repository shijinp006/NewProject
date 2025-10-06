// seedFood.js
import mongoose from "mongoose";
import Food from "./Schema/Food.js";
import { Foods } from "./FoodsData/Foods.js";
import dotenv from "dotenv";
dotenv.config();

export const AddFoodDetails = async (req, res) => {
  // const mongoUri = process.env.MONGO_URI;
  const mongoURI = "mongodb://127.0.0.1:27017/mydatabase";
  mongoose
    .connect(mongoURI, {})
    .then(async () => {
      console.log("MongoDB Connected");

      // Only insert if collection is empty
      const count = await Food.countDocuments();
      if (count === 0) {
        await Food.insertMany(Foods);
        console.log("Default food data inserted!");
        return res.status(200).json({ Message: "Default food data inserted!" });
      } else {
        console.log("Food data already exists.");
      }

      mongoose.disconnect();
    })
    .catch((err) => console.error("MongoDB connection error:", err));
};
// const mongoURI = "mongodb://127.0.0.1:27017/mydatabase"; // Replace with your DB
