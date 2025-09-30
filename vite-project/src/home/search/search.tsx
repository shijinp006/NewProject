import searchIcon from "../../assets/searchIcon.png";
import filterIcon from "../../assets/filterIcon.png";

import { useState } from "react";

export const Search = ({ onSearch }: { onSearch: (value: any) => void }) => {
  const [search, setSearch] = useState("");

  if(search) {
    onSearch(search)
  }

  return (
    <>
      <div className="flex items-center w-full h-full max-w-7xl px-4 md:px-6 lg:px-10 mx-auto">
        <div className="flex  w-full h-full flex-col gap-2 ">
          <div className="flex items-center">
            <h1 className="font-[Geist] font-bold text-[14px] md:text-4xl leading-[20px] lg:leading-[50px] text-gray-800">
              Choose <br />
              Your Favorite <span className="text-[#CC001F]">Food</span>
            </h1>
          </div>
          <div className="flex items-center justify-center w-full flex-row gap-2">
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

            <div className="flex items-center justify-center w-[45px] h-[30px] rounded-full bg-[#CC001F] shadow-md cursor-pointer hover:bg-[#B50B12] transition ">
              <img
                src={filterIcon} // replace with your filter icon path
                alt="Filter Icon"
                className="w-5 h-5 object-contain rounded-full " // clean, no bg, keeps proportions
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
