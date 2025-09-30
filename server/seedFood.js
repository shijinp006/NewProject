// seedFood.js
import mongoose from "mongoose";
import Food from "./Schema/Food.js";
import { Foods } from "./FoodsData/Foods.js";
import dotenv from "dotenv";
dotenv.config();
// const mongoURI = "mongodb://127.0.0.1:27017/mydatabase"; // Replace with your DB

const mongoUri = process.env.MONGO_URI;
mongoose
  .connect(mongoUri, {})
  .then(async () => {
    console.log("MongoDB Connected");

    // Only insert if collection is empty
    const count = await Food.countDocuments();
    if (count === 0) {
      await Food.insertMany(Foods);
      console.log("Default food data inserted!");
    } else {
      console.log("Food data already exists.");
    }

    mongoose.disconnect();
  })
  .catch((err) => console.error("MongoDB connection error:", err));
