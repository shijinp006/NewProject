import HeartIcon from "../../assets/heart.png";
import { FaHeart } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useGetFood } from "../../../hook/food";
import { useAddToFavoriteList } from "../../../hook/favoriteList";
import { useAddToCart } from "../../../hook/cart";
export const NearestFood = ({ search, filter, Loading }: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const quantity = 1;
  const { data, isLoading } = useGetFood(search, filter);

  const { mutate: addToCart } = useAddToCart();

  const handleAddToCart = (id: number, quantity: number) => {
    addToCart({ id, quantity }); // add 1 item
  };
  const navigate = useNavigate();
  const NearestFood = Array.isArray(data)
    ? data.filter((food: any) => food.category === "Nearest Food")
    : [];

  const handleClick = (id: number) => {
    navigate(`/productdetails/${id}`);
  };

  const { mutate: addToFavoriteList } = useAddToFavoriteList();

  const addToFavorite = (id: number) => {
    addToFavoriteList({ id });
  };
   useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        const cardWidth = 165 + 16; // card width + gap (Tailwind gap-4 = 16px)

        // When reaching the end, restart smoothly
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: cardWidth, behavior: "smooth" });
        }
      }
    }, 5000); // adjust timing as needed

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (isLoading) {
      Loading(true);
    }
  }, [isLoading]);

  return (
    <>
      <div className="flex flex-col  px-4 w-full h-full">
        {/* Header */}
        {NearestFood && NearestFood.length > 0 && (
          <div className="flex flex-col w-full py-12 h-full lg:mt-0  ">
            {/* Header */}
            <div className="flex items-center justify-between w-full">
              <p className="text-xs lg:text-base font-[Geist] font-bold text-gray-800">
                Nearest Food
              </p>
              <p className="text-xs lg:text-base font-[Geist] font-bold text-[#CC001F] cursor-pointer">
                See All
              </p>
            </div>

            {/* Horizontal Scroll */}
            <div
              ref={scrollRef}
              className="flex overflow-x-auto gap-4 py-2 scroll-smooth hide-scrollbar items-center justify-start lg:grid lg:grid-cols-4 lg:place-items-center lg:gap-2 h-full w-full lg:w-[900px]"
            >
              {NearestFood.map((item: any) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 w-[165px] h-[270px] lg:h-full bg-white rounded-lg p-4 flex flex-col justify-between"
                >
                  {/* Heart Icon */}
                  <button
                    className="flex items-center w-[20px] ml-29"
                    onClick={() => addToFavorite(item.id)}
                  >
                    {item.status === "Favorite" ? (
                      <FaHeart className="text-red-500 w-5 h-5" />
                    ) : (
                      <img
                        src={HeartIcon}
                        alt="Heart Icon"
                        className="w-5 h-5"
                      />
                    )}
                  </button>

                  {/* Food Image */}
                  <div className="flex items-center justify-center w-full">
                    <div className="w-[120px] h-[120px] lg:h-full lg:w-full flex items-center justify-center rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onClick={() => handleClick(item.id)}
                      />
                    </div>
                  </div>

                  {/* Name + SubName */}
                  <div className="flex flex-col items-start mt-2">
                    <p className="font-sans font-bold text-[14px]">
                      {item.name}
                    </p>
                    <p className="font-sans text-[12px] text-gray-500">
                      {item.subName}
                    </p>
                  </div>

                  {/* Price + Add Button */}
                  <div className="flex items-center justify-between mt-2">
                    <p className="font-sans font-bold text-[14px]">
                      Rs. {item.price}
                    </p>
                    <div className="flex items-center justify-center bg-[#CC001F] w-[23px] h-[23px] rounded-[4px] cursor-pointer">
                      <GoPlus
                        className="w-full text-white"
                        onClick={() => handleAddToCart(item.id, quantity || 1)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
