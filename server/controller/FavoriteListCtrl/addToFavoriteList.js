import { FavoriteList } from "../../Schema/FavoriteList.js";
import { Foods } from "../../Schema/Food.js";

export const addToFavoriteList = async (req, res) => {
  try {
    const id = Number(req.params.id);

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    // Find the product in Foods
    const productIndex = Foods.findIndex((item) => item.id === id);
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = Foods[productIndex];
    console.log(product,"product");
    

    // Check if product is already in favorites
    const exists = FavoriteList.find((item) => item.id === id);
    if (exists) {
      return res
        .status(200)
        .json({ message: "Product already in favorites", favorite: exists });
    }

    // Update the status in Foods
    Foods[productIndex] = { ...product, status: "Favorite" };

    // Add to FavoriteList
    FavoriteList.push(Foods[productIndex]);

    return res.status(201).json({
      message: "Product added to favorites successfully",
      favorite: Foods[productIndex],
    });
  } catch (error) {
    console.error("Error adding to favorites:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFavoriteList = async (req, res) => {
  try {
    console.log(FavoriteList,"fa");
    
    if (FavoriteList.length > 0) {
      return res.status(200).json(FavoriteList);
    } else {
      return res.status(204).json({ message: "Your favorite list is empty" });
    }
  } catch (error) {
    console.error("Error fetching favorite list:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const Delete = (req, res) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    // Remove from FavoriteList
    const index = FavoriteList.findIndex((item) => item.id === id);

    if (index !== -1) {
      FavoriteList.splice(index, 1);

      // Reset status in Foods array
      const foodIndex = Foods.findIndex((item) => item.id === id);
      if (foodIndex !== -1) {
        Foods[foodIndex] = { ...Foods[foodIndex], status: "" };
      }

      return res.status(200).json({ message: "Item deleted successfully" });
    } else {
      return res.status(404).json({ message: "Item not found in favorites" });
    }
  } catch (error) {
    console.error("Error deleting favorite item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
