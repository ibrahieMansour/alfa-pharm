import React from "react";

import Avatar from "@/assets/images/avatar.png";
import PhoneIcon from "@/assets/icons/phone.svg";
import LocationIcon from "@/assets/icons/location.svg";

const UserInfo = () => {
  return (
    <>
      <div className="sm:border-b border-dashed border-[#5EB756] pb-1">
        <div className="flex  max-sm:flex-col gap-x-9 m-auto w-full max-w-[500px]">
          <div className="flex flex-col items-center gap-y-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 border border-[#F4EBD0] rounded-full overflow-hidden">
              <img src={Avatar} alt="avatar-img" className="w-full h-full" />
            </div>
            <h5 className="inline-block text-bold text-[15px] sm:text-[19px]">بهية محمد عماد</h5>
          </div>
          <div className="flex-1">
            <div className="pb-1">
              <p className="text-[10px] text-[#1E1E1E] font-medium pb-1">رقم الهاتف</p>
              <div className="flex items-center gap-x-3 bg-white py-1 px-2 rounded-lg">
                <div className="w-5">
                  <img src={PhoneIcon} alt="phone-icon" className="w-5 h-5" />
                </div>
                <p className="flex-1 text-[11px] text-[#2A2A2A]">0101567389</p>
              </div>
            </div>
            <div className="">
              <p className="text-[10px] text-[#1E1E1E] font-medium pb-1">العنوان</p>
              <div className="flex items-center gap-x-3 bg-white py-1 px-2 rounded-lg">
                <div className="w-5">
                  <img src={LocationIcon} alt="phone-icon" className="w-5 h-5" />
                </div>
                <p className="flex-1 text-[11px] text-[#2A2A2A]">صيدلية</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserInfo;
