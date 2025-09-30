import LeftArrow from "../assets/angle-left.png";
import Shoppingbag from "../assets/shopping-bag.png";
import PlusIcon from "../assets/plusIcon.png";
import MinusIcon from "../assets/minus.png";
import DeleteIcon from "../assets/trash.png";
import { Selection } from "../home/selections/selection";
import { useGetCartItems } from "../../hook/cart";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUpdateQty, useDeleteCart } from "../../hook/cart";
import EmptyCartImg from "../assets/empty-cart.png";
interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  totalAmount: number;
  weight?: string;
}

export const CartList = () => {
  const { data: cart, isLoading } = useGetCartItems();
  const [items, setItems] = useState<CartItem[]>([]);

  const itemsArray = Array.isArray(items) ? items : [];
  useEffect(() => {
    if (cart as any) setItems(cart as any);
  }, [cart]);

  const { mutate: updateCartQty } = useUpdateQty();
  const { mutate: deleteCart } = useDeleteCart();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
      </div>
    );
  }
  if (!itemsArray || itemsArray.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4 text-center space-y-6">
        {/* Empty Cart Image */}
        <img
          src={EmptyCartImg}
          alt="Empty Cart"
          className="w-50 h-50 object-contain animate-pulse"
        />

        {/* Message */}
        <p className="text-gray-500 text-xl font-semibold">
          Your cart is empty
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
  const handleIncrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
              totalAmount: (item.quantity + 1) * item.price,
            }
          : item
      )
    );

    // Find the updated quantity
    const item = itemsArray.find((i) => i.id === id);
    if (item) {
      updateCartQty({ id, quantity: item.quantity + 1 }); // call mutation
    }
  };
  const handleDecrease = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              totalAmount: (item.quantity - 1) * item.price,
            }
          : item
      )
    );
    const item = itemsArray.find((i) => i.id === id);
    if (item) {
      updateCartQty({ id, quantity: item.quantity - 1 }); // call mutation
    }
  };

  const handleDelete = (id: number) => {
    deleteCart({ id });
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between w-full h-13 px-4 bg-red-900 text-white">
        <Link
          to="/"
          className="p-2 bg-white rounded-md flex items-center justify-center"
        >
          <img src={LeftArrow} alt="Back" className="w-3" />
        </Link>
        <h1 className="font-bold text-[14px]">My Cart</h1>
        <div className="p-2 bg-white rounded-md flex items-center justify-center">
          <img src={Shoppingbag} alt="Cart" className="w-3" />
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-3xl mx-auto w-full">
        {itemsArray.map((item) => (
          <div
            key={item.id}
            className="relative flex items-center justify-between bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4"
          >
            {/* Delete Button */}
            <button
              onClick={() => handleDelete(item.id)}
              className="absolute top-2 right-2 p-2 rounded-full z-10"
            >
              <img src={DeleteIcon} alt="Delete" className="w-3" />
            </button>

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
              <p className="text-sm sm:text-base font-semibold">{item.name}</p>
              <p className="text-[12px] font-bold mt-1">
                ₹{item.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col justify-center gap-2">
              <div className="flex items-center bg-gray-100 rounded-full px-2 mt-5">
                <button
                  onClick={() => handleDecrease(item.id)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <img src={MinusIcon} alt="-" className="w-3" />
                </button>
                <span className="mx-2 text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleIncrease(item.id)}
                  className="p-1 hover:bg-gray-200 rounded-full"
                >
                  <img src={PlusIcon} alt="+" className="w-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Price Summary + Buy Now */}
      <div className="w-full bg-gray-100 px-4 py-4 ">
        <div className="bg-white rounded-xl shadow-md  sm:p-6 w-full p-17">
          <div className="flex justify-between mb-2">
            <span className="text-gray-600 font-sans font-bold text-[12px]">
              Subtotal
            </span>
            <span className="font-sans font-bold text-[12px]">
              ₹
              {itemsArray
                .reduce((acc, item) => acc + item.totalAmount, 0)
                .toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-sans font-bold text-[12px]">
              Delivery Charge
            </span>
            <span className="font-semibold text-[12px]">₹20.00</span>
          </div>
          <div className="flex justify-between mt-4 pt-2 border-t font-sans font-bold text-[14px] text-lg">
            <span className="font-sans font-bold text-[12px]">Total</span>
            <span className="font-sans font-bold text-[12px]">
              ₹
              {(
                itemsArray.reduce((acc, item) => acc + item.totalAmount, 0) + 20
              ).toFixed(2)}
            </span>
          </div>
          <button className="w-full mt-4 bg-red-900 text-white py-3 rounded-lg font-sans font-bold text-[14px] hover:bg-red-800 transition-colors">
            Buy Now
          </button>
        </div>
      </div>

      {/* Conditional Selection */}

      <div className="fixed bottom-0 left-0 w-full z-10">
        <Selection />
      </div>
    </div>
  );
};
