import LeftArrow from "../assets/angle-left.png";
import { CiMenuKebab } from "react-icons/ci";
import { useState } from "react";
import MinusIcon from "../assets/minus.png";
import PlusIcon from "../assets/plusIcon.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useGetFoodbyId } from "../../hook/food";
import { useAddToCart } from "../../hook/cart";

export const ProductDetails = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [quantity, setQuantity] = useState(1);

  if (quantity < 1) {
    setQuantity(1);
  }

  const { id } = useParams(); // productId
  const { data, isLoading, error } = useGetFoodbyId(Number(id)); //Fetching Data

  //Adding To Cart

  const { mutate: addToCart } = useAddToCart();

  const handleClick = (id: number) => {
    addToCart({ id, quantity }); // add 1 item
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (error) return <p>Error loading popular foods.</p>;
  if (!data || data.length === 0) return <p>No foods available.</p>;

  return (
    <>
      {data?.map((item) => (
        <div
          key={item.id}
          className="w-full h-full lg:h-screen flex flex-col items-center justify-start bg-[#F5F5F5]  lg:pt-0"
        >
          {/* Header & Image */}
          <div className="relative w-full flex items-center justify-center bg-[#9E090F] h-[300px] rounded-b-[150px] ">
            <div className="absolute top-4 left-4 bg-white rounded-full w-[30px] h-[30px] flex items-center justify-center">
              <Link to="/">
                <img
                  src={LeftArrow}
                  alt="Left Arrow"
                  className="w-[25px] h-[25px]"
                />
              </Link>
            </div>
            <div className="absolute top-4 right-4">
              <CiMenuKebab className="text-white" />
            </div>
            <div className="absolute -bottom-16 flex items-center justify-center">
              <a href={item.image} target="_blank" rel="noopener noreferrer">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[250px] h-[280px] object-cover rounded-lg"
                />
              </a>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col items-center w-full max-w-7xl px-4 md:px-6 lg:px-10 mt-20 lg:mt-24 gap-4">
            {/* Name & Price */}
            <div className="flex items-center justify-between w-full">
              <p className="font-sans font-bold text-[18px]">{item.name}</p>
              <p className="font-sans font-bold text-[14px] text-[#CC001F]">
                Rs. {item.price}
              </p>
            </div>

            {/* SubName */}
            <p className="w-full font-sans font-semibold text-[14px] text-gray-700">
              {item.subName}
            </p>

            {/* Tabs */}
            <div className="flex gap-2 w-full">
              <div className="flex-1 flex items-center justify-center bg-[#9E090F] h-[45px] rounded-full">
                <p className="font-sans font-semibold text-[14px] text-white">
                  Details
                </p>
              </div>
              <div className="flex-1 flex items-center justify-center bg-white h-[45px] rounded-full">
                <p className="font-sans font-semibold text-[14px] text-black">
                  Reviews
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-start text-sm text-gray-700 mt-2 w-full">
              {!isExpanded ? (
                <>
                  {item.description.length > 100
                    ? item.description.slice(0, 100) + "..."
                    : item.description}{" "}
                  {item.description.length > 100 && (
                    <button
                      onClick={() => setIsExpanded(true)}
                      className="text-[#CC001F] text-xs font-semibold ml-1"
                    >
                      See more
                    </button>
                  )}
                </>
              ) : (
                <>
                  {item.description}{" "}
                  {item.description.length > 100 && (
                    <button
                      onClick={() => setIsExpanded(false)}
                      className="text-[#CC001F] text-xs font-semibold ml-1"
                    >
                      See less
                    </button>
                  )}
                </>
              )}
            </p>

            {/* Counter & Add to Cart */}
            <div className="flex items-center justify-start w-full gap-4 mt-4 mb-4">
              <div className="flex items-center justify-between bg-white w-[130px] h-[50px] rounded-full px-2">
                <div
                  className="flex items-center justify-center bg-[#9E090F] w-[30px] h-[30px] rounded-full cursor-pointer"
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 0))}
                >
                  <img
                    src={MinusIcon}
                    alt="Minus Icon"
                    className="w-[16px] h-[16px]"
                  />
                </div>
                <p className="font-sans font-semibold text-[14px]">
                  {quantity}
                </p>
                <div
                  className="flex items-center justify-center bg-[#9E090F] w-[30px] h-[30px] rounded-full cursor-pointer"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <img
                    src={PlusIcon}
                    alt="Plus Icon"
                    className="w-[16px] h-[16px]"
                  />
                </div>
              </div>
              <button
                className="flex items-center justify-center w-[200px] h-[45px] bg-[#9E090F] rounded-full cursor-pointer"
                onClick={() => handleClick(item.id)}
                disabled={isLoading}
              >
                <p className="font-sans font-semibold text-[12px] text-white">
                  Add To Cart
                </p>
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
