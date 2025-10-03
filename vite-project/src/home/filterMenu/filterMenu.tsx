import { useState } from "react";

interface FilterMenuProps {
  categories?: string[];
  onFilterChange?: (filters: { category: string; price: number }) => void;
}

export const FilterMenu: React.FC<FilterMenuProps> = ({ onFilterChange }) => {
  const defaultCategories = ["All", "Popular Food", "Nearest Food"];
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [price, setPrice] = useState(500);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    onFilterChange?.({ category: cat, price });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    setPrice(newPrice);
    onFilterChange?.({ category: selectedCategory, price: newPrice });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-lg w-full sm:max-w-[300px] mx-auto text-xs sm:text-sm">
      {/* Categories Heading */}
      <h2 className="text-gray-800 font-semibold mb-2 text-sm sm:text-base">
        Categories
      </h2>

      {/* Categories - vertical list (no selection style, no round) */}
      <div className="flex flex-col gap-2 mb-3">
        {defaultCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className="text-left text-gray-700 hover:text-red-600 transition"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-3">
        <div className="flex justify-between mb-1 text-xs sm:text-sm font-medium">
          <span className="truncate">Price: Rs.{price}</span>
        </div>
        <input
          type="range"
          min={0}
          max={500}
          value={price}
          onChange={handlePriceChange}
          className="w-full h-2 rounded-full accent-red-600"
        />
      </div>

      {/* Apply Button */}
      <button
        className="w-full bg-red-600 text-white py-2 rounded-lg font-medium hover:bg-red-700 transition text-sm sm:text-base"
        onClick={() => onFilterChange?.({ category: selectedCategory, price })}
      >
        Apply
      </button>
    </div>
  );
};
