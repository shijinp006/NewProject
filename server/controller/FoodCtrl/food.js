import Food from "../../Schema/Food.js";

// Get all foods or search by query
export const getFood = async (req, res) => {
  try {
    const { search } = req.query;

    let foods;

    if (!search || search.trim() === "") {
      // If no search term, return all foods
      foods = await Food.find({});
    } else {
      const regex = new RegExp(search, "i"); // Case-insensitive search
      foods = await Food.find({
        $or: [
          { name: regex },
          { category: regex }
        ]
      });
    }

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
    console.log(productId,"id");
    

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
