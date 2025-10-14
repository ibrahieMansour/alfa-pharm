import { Outlet } from "react-router-dom";

import authImage from "../../assets/images/authImage.png";

const AuthLayout = () => {
  return (
    <>
      <div className="h-screen max-h-screen overflow-hidden flex flex-col bg-[#DDE2DC]">
        <div className="relative p-4 after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-full after:bg-gradient-to-r after:from-[#E97E39] after:to-[#5EB756] [direction:ltr] sm:block hidden">
          <div className="text-[30px] font-medium leading-6 text-[#5EB756]">
            Alfα<span className="text-[#E97E39]">Pharm</span>
          </div>
        </div>
        <div className="relative flex flex-1 justify-around">
          <div className="flex flex-1 justify-center items-center">
            <Outlet />
          </div>

          <div className="self-center w-[2px] h-5/6 bg-gradient-to-b from-[#DDE2DC] via-[#5EB756] to-[#DDE2DC] max-md:hidden"></div>

          <div className="flex flex-1 justify-center items-center max-md:hidden">
            <img
              src={authImage}
              alt="auth-image"
              className="transition-all md:w-[225px] lg:w-[275px]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
