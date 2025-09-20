import profile from "../../assets/profile.jpeg";
import bellIcon from "../../assets/bellIcon.png";

export const Profile = () => {
  return (
    <>
      <nav className="flex items-center w-full h-[20px] lg:h-[60px] flex-row  py-6 mt-5">
        <div className="flex items-center w-full max-w-7xl px-4 md:px-6 lf:px-10 mx-auto justify-between ">
          {" "}
          <div className="flex items-center justify-center w-[40px] h-[40px] lg:w-[49px] lg:h-[49px] rounded-full">
            <img
              src={profile}
              alt="Proifile Photo"
              className="rounded-full w-full h-full"
            />
          </div>
          <div className="flex items-center justify-center w-[20px] h-[10px] rounded-full">
            <img src={bellIcon} alt="Bell Icon" className="rounded-full" />
          </div>
        </div>
      </nav>
    </>
  );
};
