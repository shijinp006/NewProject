import { Foods } from "../../Schema/Food.js";

// Get Popular Foods
export const getFood = async (req, res) => {
  try {
    const { search } = req.query; // get search term from query params
    console.log(search);

    // If search is empty, null, undefined, or empty string, return full list
    if (!search || search.trim() === "") {
      return res.status(200).json(Foods);
    }

    const lowerSearch = search.toLowerCase();
    const filteredFoods = Foods.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerSearch) ||
        (item.category && item.category.toLowerCase().includes(lowerSearch))
    );

    return res.status(200).json(filteredFoods);
  } catch (error) {
    console.error("Error fetching foods:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getFoodbyId = async (req, res) => {
  const { id } = req.params;
  const productId = Number(id);

  if (!productId) {
    res.status(400).json({ message: "Invaid Id" });
  }

  const Food = Foods.find((item) => item.id === productId);

  return res.status(200).json([Food]);
};
