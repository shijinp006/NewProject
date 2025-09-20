import { Profile } from "./profile/profile";
import { Search } from "./search/search";
import { Categories } from "./categories/categories";
import { PopularFood } from "./popularfood/popularfood";
import { NearestFood } from "./nearestfood/nearestfood";
import { Selection } from "./selections/selection";

export const Home = () => {
  return (
    <>
      <div className="w-full h-full flex items-center justify-center flex-col lg:flex-row flex-wrap bg-[#F5F5F5] relative">
        <div className="w-full">
          <Profile />
        </div>
        <div className="w-full">
          <Search />
        </div>
        <div className="w-full">
          <Categories />
        </div>
        <div className="w-full">
          <PopularFood />
        </div>
        <div className="w-full">
          <NearestFood />
        </div>
        <div className="w-full fixed bottom-0 right-0 z-6  rounded flex items-center justify-end">
          <Selection/>
        </div>
      </div>
    </>
  );
};
