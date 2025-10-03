import Food from "../../Schema/Food.js";

// Get all foods or search by query

export const getFood = async (req, res) => {
  try {
    const { search = "", category, price } = req.query;

    // Build a dynamic query object
    const query = {};

    // Search by name or category if search term exists
    if (search.trim() !== "") {
      const regex = new RegExp(search, "i"); // case-insensitive
      query.$or = [{ name: regex }, { category: regex }];
    }

    // Filter by category if provided and not "All"
    if (category && category !== "All") {
      query.category = category;
    }

    // Filter by price if provided
    if (price) {
      query.price = { $lte: Number(price) }; // price less than or equal
    }

    const foods = await Food.find(query);

    return res.status(200).json(foods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// Get food by ID
export const getFoodbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = Number(id);
    console.log(productId, "id");

    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const food = await Food.findOne({ id: productId });

    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    return res.status(200).json([food]);
  } catch (error) {
    console.error("Error fetching food by ID:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
