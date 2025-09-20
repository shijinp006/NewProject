import plusIcon from "../../assets/plusIcon.png";
import HomeIcon from "../../assets/home.png"
import HeartIcon from "../../assets/heartblack.png"
import CartIcon from "../../assets/shopping-cart.png"
import UserIcon from "../../assets/user.png"
import { useState, useRef, useEffect } from "react";

export const Selection = () => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      {/* Plus Button */}
      {!isOpen && (
        <div
          className="flex items-center justify-center w-[30px] h-[30px] rounded-full bg-[#CC001F] cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <img src={plusIcon} alt="Plus Icon" />
        </div>
      )}

      {/* Open Panel */}
      {isOpen && (
        <div className="absolute  bottom-4 right-4 w-[200px] h-[40px] bg-[#CC001F] rounded-full p-4 flex items-center justify-between text-white shadow-lg">
            <div className="flex items-center justify-center w-[15px] h-full ">
                <img src={HomeIcon} alt="Home Icon" />
            </div>
            <div className="flex items-center justify-center w-[15px] h-full ">
                <img src={HeartIcon} alt="Heart Icon" />
            </div>
              <div className="flex items-center justify-center w-[15px] h-full ">
                <img src={CartIcon} alt="Cart Icon" />
            </div>
              <div className="flex items-center justify-center w-[15px] h-full ">
                <img src={UserIcon} alt="User Icon" />
            </div>
        </div>
      )}
    </div>
  );
};
