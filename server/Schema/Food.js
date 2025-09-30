import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  cart: { type: Boolean, default: false }, // always true when added
  status: { type: String },
  name: { type: String, required: true },
  image: { type: String, required: true },
  subName: { type: String },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  description: { type: String },
});

const Food = mongoose.model("Food", foodSchema);

export default Food;
