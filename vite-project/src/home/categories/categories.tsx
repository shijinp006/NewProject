import { useState } from "react";
import { foods } from "../../datas";

export const Categories = () => {
  // Get unique food names and add "All" at the start
  const categories = ["All", ...Array.from(new Set(foods.map(food => food.name)))];

  // State to track which category is selected
  const [selected, setSelected] = useState("All");

  return (
    <div className="flex overflow-x-auto gap-2 py-2 px-4 scroll-smooth hide-scrollbar lg:mt-0 mt-2 items-center justify-start lg:justify-center">
      {categories.map((name, index) => (
        <div
          key={index}
          onClick={() => setSelected(name)}
          className={`flex-shrink-0 flex items-center justify-center px-5 py-2 h-[30px] rounded-full cursor-pointer transition-colors
            ${selected === name ? "bg-[#CC001F]" : "bg-[#FFFFFF]"}`
          }
        >
          <p
            className={`text-xs font-[Geist] font-semibold whitespace-nowrap px-2
              ${selected === name ? "text-white" : "text-black"}`
            }
          >
            {name}
          </p>
        </div>
      ))}
    </div>
  );
};
