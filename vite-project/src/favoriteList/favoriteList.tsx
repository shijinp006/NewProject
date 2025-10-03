import LeftArrow from "../assets/angle-left.png";
import Shoppingbag from "../assets/shopping-bag.png";
import { Link } from "react-router-dom";
import { useAddToCart } from "../../hook/cart";
import EmptyImg from "../assets/web.png";
import {
  useGetFavoriteItemsList,
  useDeleteFavoriteItem,
} from "../../hook/favoriteList";
import DeleteIcon from "../assets/trash.png";
import { Selection } from "../home/selections/selection";

export const FavoriteList = () => {
  const { data: favoriteItemsData, isLoading } = useGetFavoriteItemsList();
  const { mutate: addToCart } = useAddToCart();
  const favoriteItems = Array.isArray(favoriteItemsData)
    ? favoriteItemsData
    : [];

  const handleAddToCart = (id: number, quantity: number = 1) => {
    addToCart({ id, quantity });
  };

  const { mutate: deleteFavoriteItem } = useDeleteFavoriteItem();

  const handleDelete = async (id: number) => {
    deleteFavoriteItem({ id });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }

  // Empty state
  if (!favoriteItems || favoriteItems.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center space-y-6">
        {/* Empty Cart Image */}
        <img
          src={EmptyImg}
          alt="Empty Cart"
          className="w-50 h-50 object-contain animate-pulse"
        />

        {/* Message */}
        <p className="text-gray-500 text-xl font-semibold">
          Your Favorite List is empty
        </p>
        <p className="text-gray-400 text-sm">
          Looks like you haven’t added anything to your cart yet.
        </p>

        {/* Back Home Button */}
        <Link
          to="/"
          className="mt-4 bg-red-900 text-white py-2 px-6 rounded-lg font-semibold hover:bg-red-800 transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between w-full h-13 px-4 bg-red-900 text-white">
        <Link
          to="/"
          className="p-1 bg-white rounded-md flex items-center justify-center "
        >
          <img src={LeftArrow} alt="Back" className="w-5" />
        </Link>
        <h1 className="font-bold text-[14px]">Wish List</h1>
        <div className="p-2 bg-white rounded-md flex items-center justify-center">
          <img src={Shoppingbag} alt="Cart" className="w-3" />
        </div>
      </div>

      {/* Favorite Items */}
      <div className="flex-1 overflow-y-auto p-12 mx-auto w-full max-w-3xl">
        {favoriteItems.map((item: any, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex items-center bg-white rounded-xl shadow-md p-4 mb-4 w-full"
          >
            {/* Image */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 flex flex-col ml-4">
              <p className="text-sm sm:text-base font-semibold">
                {item.name || "No Name"}
              </p>
              <p className="text-[12px] font-bold mt-1">
                ₹
                {item.price !== undefined && item.price !== null
                  ? item.price.toFixed(2)
                  : "0.00"}
              </p>

              {/* Cart Button / Status */}
              {item.cart ? (
                <span className="text-green-600 font-medium mt-2 text-xs">
                  ✅ Item in Cart
                </span>
              ) : (
                <button
                  onClick={() => handleAddToCart(item.id, item.quantity || 1)}
                  className="bg-red-900 text-white py-1 px-2 rounded-sm font-semibold text-xs hover:bg-red-800 transition-colors mt-2 w-fit"
                >
                  Add to Cart
                </button>
              )}
            </div>

            {/* Delete Icon */}
            <button
              onClick={() => handleDelete(item.id)}
              className="ml-3 text-gray-500 hover:text-red-600 transition-colors"
            >
              <img src={DeleteIcon} alt="Delete Icon" className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-0 w-full z-10">
        <Selection />
      </div>
    </div>
  );
};
