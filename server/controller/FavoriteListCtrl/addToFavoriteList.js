import { FavoriteList } from "../../Schema/FavoriteList.js";
import Food from "../../Schema/Food.js";

// Add item to Favorite
export const addToFavoriteList = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id || isNaN(id))
      return res.status(400).json({ message: "Invalid product ID" });

    const product = await Food.findOne({ id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    const exists = await FavoriteList.findOne({ id });
    if (exists)
      return res
        .status(200)
        .json({ message: "Product already in favorites", favorite: exists });

    // Add to FavoriteList
    const newFavorite = await FavoriteList.create({
      id: product.id,
      cart: product.cart || false,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    // ✅ Update status in the Food document
    product.status = "Favorite";
    await product.save();

    return res.status(201).json({
      message: "Product added to favorites successfully",
      favorite: newFavorite,
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get Favorite List
export const getFavoriteList = async (req, res) => {
  try {
    const favorites = await FavoriteList.find({}).lean();
    if (!favorites.length)
      return res
        .status(200)
        .json({ message: "Your favorite list is empty", favoriteList: [] });

    return res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorite list:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete Favorite item
export const deleteFavoriteItem = async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (!id || isNaN(id))
      return res.status(400).json({ message: "Invalid ID" });

    const favoriteItem = await FavoriteList.findOneAndDelete({ id });
    if (!favoriteItem)
      return res.status(404).json({ message: "Item not found in favorites" });

    // Reset status in Food
    await Food.findOneAndUpdate({ id }, { status: "" });

    return res
      .status(200)
      .json({ message: "Item removed from favorites successfully" });
  } catch (error) {
    console.error("Error deleting favorite item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
