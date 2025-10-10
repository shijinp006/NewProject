import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import FoodRoute from "./routes/FoodRoute.js"; // ✅ include .js
import CartRoute from "./routes/CartRoute.js";
import FavoriteRoute from "./routes/FavoriteRoute.js";
import AddFoodRoute from "./routes/AddFoodRoute.js";
import dotenv from "dotenv";
dotenv.config();

// const mongoURI = "mongodb://127.0.0.1:27017/mydatabase"; // Replace 'mydatabase' with your DB name

const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

const Port = 4000;
// Middleware
// app.use(
//   cors({
//     origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"], // explicitly allow these methods
//     allowedHeaders: ["Content-Type", "Authorization"], // optional: specify headers
//   })
// );

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // ✅ Allow only your Vercel domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // optional — if using cookies or JWT
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));

app.use("/", FoodRoute);
app.use("/", CartRoute);
app.use("/", FavoriteRoute);
app.use("/", AddFoodRoute);

app.listen(Port, () => {
  console.log(`Server Running Port ${Port}`);
});
