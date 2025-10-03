import { Profile } from "./profile/profile";
import { Search } from "./search/search";
import { Categories } from "./categories/categories";
import { PopularFood } from "./popularfood/popularfood";
import { NearestFood } from "./nearestfood/nearestfood";
import { Selection } from "./selections/selection";
import { useEffect, useState } from "react";
import { useLoading } from "../loadingContext/loadingContext";
export const Home = () => {
  const [search, setSearch] = useState();
  const [filters, setFilters] = useState({ categories: "", price: "" });
  const [loading, setIsLoading] = useState(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    // Start loading
    setLoading(true);

    // Stop loading after 1 second
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Cleanup
    return () => clearTimeout(timer);
  }, [loading]); // run once on mount

  return (
    <>
      <div className="w-full h-full flex items-center justify-center flex-col lg:flex-row flex-wrap bg-[#F5F5F5] relative">
        <div className="w-full">
          <Profile />
        </div>
        <div className="w-full">
          <Search onSearch={setSearch} onFilter={setFilters} />
        </div>
        <div className="w-full">
          <Categories />
        </div>
        <div className="w-full">
          <PopularFood
            search={search}
            filter={filters}
            Loading={setIsLoading}
          />
        </div>
        <div className="w-full">
          <NearestFood
            search={search}
            filter={filters}
            Loading={setIsLoading}
          />
        </div>
        <div className="w-full fixed bottom-2 z-6  rounded flex items-center justify-center lg:justify-end ">
          <Selection />
        </div>
      </div>
    </>
  );
};
