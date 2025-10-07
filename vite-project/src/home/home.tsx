import { Profile } from "./profile/profile";
import { Search } from "./search/search";
import { Categories } from "./categories/categories";
import { PopularFood } from "./popularfood/popularfood";
import { NearestFood } from "./nearestfood/nearestfood";
import { Selection } from "./selections/selection";
import { useEffect, useState } from "react";
import { useLoading } from "../loadingContext/loadingContext";
import emptyImage from "../assets/empty.png";
import netWorkError from "../assets/charging.png";

export const Home = () => {
  const [search, setSearch] = useState();
  const [filters, setFilters] = useState({ categories: "", price: "" });
  const [loading, setIsLoading] = useState(false);
  const [emptyPopularFood, setEmptyPopularFood] = useState(false);
  const [emptyNearestFood, setEmptyNearestFood] = useState(false);
  const [isOnline, setIsOnline] = useState(true);

  const { setLoading } = useLoading();

  // ✅ Handle global loading
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [loading]);

  // ✅ Detect internet connection
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Cleanup
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // ✅ Handle offline state
  if (!isOnline) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <img
          src={netWorkError}
          alt="No Internet Connection"
          className="w-50 h-50 object-contain mb-6 opacity-90"
        />
        <h1 className="text-3xl font-extrabold text-red-600 mb-2">
          No Internet Connection
        </h1>
        <p className="text-gray-700 text-base mb-4">
          Please check your network and try again.
        </p>
        <p className="text-gray-500 text-sm">
          You are currently offline. We’ll reconnect automatically when
          available.
        </p>
      </div>
    );
  }

  // ✅ Handle empty food lists (404 style)
  if (emptyPopularFood && emptyNearestFood) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <img
          src={emptyImage}
          alt="No food found"
          className="w-50 h-50 object-contain mb-6 opacity-90"
        />

        <p className="text-lg font-medium text-gray-700 mb-1">
          No food items found
        </p>
        <p className="text-gray-500">
          Try adjusting your filters or search term.
        </p>
      </div>
    );
  }

  // ✅ Main content
  return (
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
          emptyPopularFood={setEmptyPopularFood}
        />
      </div>
      <div className="w-full">
        <NearestFood
          search={search}
          filter={filters}
          Loading={setIsLoading}
          emptyNearestFood={setEmptyNearestFood}
        />
      </div>
      <div className="w-full fixed bottom-2 z-6 rounded flex items-center justify-center lg:justify-end">
        <Selection />
      </div>
    </div>
  );
};
