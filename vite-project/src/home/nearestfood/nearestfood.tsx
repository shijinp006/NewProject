import { NearestFoods } from "./nearestfooddata";
import HeartIcon from "../../assets/heart.png";
import plusIcon from "../../assets/plusIcon.png";
export const NearestFood = () => {
  return (
    <>
      <div className="flex flex-col gap-2 py-2 px-4 w-full h-full lg:mt-0 mt-2 items-center justify-center">
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
        <div className=" flex overflow-x-auto gap-4 py-2 scroll-smooth hide-scrollbar items-center justify-start  lg:grid lg:grid-cols-4 lg:place-items-center lg:gap-2  h-full w-full lg:w-[900px]">
          {NearestFoods.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[165px] h-[270px] bg-white rounded-lg p-4 flex flex-col justify-between"
            >
              {/* Heart Icon top-right */}
              <div className="flex items-center justify-end">
                <img src={HeartIcon} alt="Heart Icon" className="w-[20px]" />
              </div>

              {/* Food Image */}
              <div className="flex items-center justify-center w-full">
                <div className="w-[120px] h-[120px] lg:h-full lg:w-full flex items-center justify-center rounded-md overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name + SubName */}
              <div className="flex flex-col items-start mt-2">
                <p className="font-sans font-bold text-[14px]">{item.name}</p>
                <p className="font-sans text-[12px] text-gray-500">
                  {item.subName}
                </p>
              </div>

              {/* Price + Add Button */}
              <div className="flex items-center justify-between mt-2">
                <p className="font-sans font-bold text-[14px]">{item.price}</p>
                <div className="flex items-center justify-center bg-[#CC001F] w-[23px] h-[23px] rounded-[4px] cursor-pointer">
                  <img src={plusIcon} alt="Plus Icon" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
