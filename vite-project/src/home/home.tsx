import { Profile } from "./profile/profile";
import { Search } from "./search/search";
import { Categories } from "./categories/categories";
import { PopularFood } from "./popularfood/popularfood";
import { NearestFood } from "./nearestfood/nearestfood";
import { Selection } from "./selections/selection";
import { useState } from "react";
export const Home = () => {
  const [search, setSearch] = useState();




  return (
    <>
      <div className="w-full h-full flex items-center justify-center flex-col lg:flex-row flex-wrap bg-[#F5F5F5] relative">
        <div className="w-full">
          <Profile />
        </div>
        <div className="w-full">
          <Search onSearch={setSearch} />
        </div>
        <div className="w-full">
          <Categories />
        </div>
        <div className="w-full">
          <PopularFood search={search} />
        </div>
        <div className="w-full">
          <NearestFood search={search} />
        </div>
        <div className="w-full fixed bottom-0 right-0 z-6  rounded flex items-center justify-end">
          <Selection />
        </div>
      </div>
    </>
  );
};
