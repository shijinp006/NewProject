import express from "express";
import cors from "cors";

import FoodRoute from "./routes/FoodRoute.js"; // ✅ include .js
import CartRoute  from "./routes/CartRoute.js";
import FavoriteRoute from "./routes/FavoriteRoute.js";

const app = express();
const backendUrl =  "https://new-project-chse.vercel.app";

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"], // explicitly allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // optional: specify headers
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.use("/", FoodRoute);
app.use("/", CartRoute);
app.use("/", FavoriteRoute);

app.listen(backendUrl, () => {
  console.log(`Server Running Port ${backendUrl}`);
});
