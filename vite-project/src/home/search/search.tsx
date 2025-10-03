import searchIcon from "../../assets/searchIcon.png";
import filterIcon from "../../assets/filterIcon.png";
import { FilterMenu } from "../filterMenu/filterMenu";

interface SearchProps {
  onSearch: (value: any) => void;
  onFilter: (filters: any) => void;
}
import { useState, useRef, useEffect } from "react";

export const Search: React.FC<SearchProps> = ({ onSearch, onFilter }) => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState({ categories: "", price: "" });

  // const [selectedCategory, setSelectedCategory] = useState("All");

  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // const handleOptionSelect = (value: string) => {
  //   setSelectedCategory(value); // update selected value
  //   onSearch(value); // send selected value to parent
  //   setIsOpen(false); // close dropdown
  // };

  useEffect(() => {
    if (search) {
      onSearch?.(search); // safe optional chaining
    }
  }, [search, onSearch]);

  useEffect(() => {
    if (filters) {
      onFilter?.(filters); // safe optional chaining
    }
  }, [filters, onFilter]);

  return (
    <div className="flex items-center w-full h-full max-w-7xl px-4 md:px-6 lg:px-10 mx-auto relative">
      <div className="flex w-full h-full flex-col gap-2">
        <div className="flex items-center">
          <h1 className="font-[Geist] font-bold text-[14px] md:text-4xl leading-[20px] lg:leading-[50px] text-gray-800">
            Choose <br />
            Your Favorite <span className="text-[#CC001F]">Food</span>
          </h1>
        </div>
        <div className="flex items-center justify-center w-full flex-row gap-2">
          {/* Search Input */}
          <div className="flex items-center gap-1 w-full h-[40px] max-w-md rounded-full bg-white shadow px-3">
            <img
              src={searchIcon}
              alt="Search"
              className="w-[28px] h-[28px] text-gray-500"
            />
            <input
              type="text"
              placeholder="Search"
              value={search}
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 text-[12px] font-[Geist]"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filter Dropdown */}
          <div className="relative" ref={wrapperRef}>
            <div
              className="flex items-center justify-center w-[45px] h-[30px] rounded-full bg-[#CC001F] shadow-md cursor-pointer hover:bg-[#B50B12] transition"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              <img
                src={filterIcon}
                alt="Filter Icon"
                className="w-5 h-5 object-contain rounded-full"
              />
            </div>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute top-full mt-2 right-0 z-50 bg-white shadow-lg p-4 rounded min-w-[200px]">
                <FilterMenu onFilterChange={setFilters} open = {setIsOpen} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
