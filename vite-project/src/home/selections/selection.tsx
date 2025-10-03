import { BiCart } from "react-icons/bi";
import { IoMdHome } from "react-icons/io";
import { BsHeart } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useGetCartItems } from "../../../hook/cart";
import { useGetFavoriteItemsList } from "../../../hook/favoriteList";

export const Selection = () => {
  const { data: cartItems } = useGetCartItems();
  const { data: favoriteItems } = useGetFavoriteItemsList();
  const location = useLocation(); // to determine active route
  console.log(cartItems,"cart");
  console.log(favoriteItems , "fav");
  
  

  // helper function to check if link is active
  const isActive = (path: string) => location.pathname === path;

  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="absolute bottom-4 right-10 w-[240px] h-[60px] bg-[#CC001F] rounded-full p-4 flex items-center justify-between text-white shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Home Icon */}
          <Link to={"/"}>
            <motion.div
              className={`p-2 rounded-full`}
              animate={{
                scale: isActive("/") ? 1.1 : 1, // decreased zoom
                backgroundColor: isActive("/") ? "#ffffff33" : "transparent",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <IoMdHome className="w-[23px] h-full" />
            </motion.div>
          </Link>

          {/* Favorite Icon */}
          <Link to="/favoriteList" className="relative">
            <motion.div
              className="p-2 rounded-full"
              animate={{
                scale: isActive("/favoriteList") ? 1.1 : 1,
                backgroundColor: isActive("/favoriteList")
                  ? "#ffffff33"
                  : "transparent",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BsHeart className="w-[18px] h-full" />
              {favoriteItems && favoriteItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {favoriteItems.length}
                </span>
              )}
            </motion.div>
          </Link>

          {/* Cart Icon */}
          <Link to="/cartlist" className="relative">
            <motion.div
              className="p-2 rounded-full"
              animate={{
                scale: isActive("/cartlist") ? 1.1 : 1,
                backgroundColor: isActive("/cartlist")
                  ? "#ffffff33"
                  : "transparent",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BiCart className="w-[23px] h-full" />
              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </motion.div>
          </Link>

          {/* User Icon */}
          <Link to="#">
            <motion.div
              className="p-2 rounded-full"
              animate={{
                scale: isActive("/profile") ? 1.1 : 1,
                backgroundColor: isActive("/profile")
                  ? "#ffffff33"
                  : "transparent",
              }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <FaRegUser className="w-[18px] h-full" />
            </motion.div>
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
