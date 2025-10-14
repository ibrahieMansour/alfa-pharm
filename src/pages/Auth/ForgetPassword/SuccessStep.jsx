import { Link } from "react-router-dom";
import AuthHeading from "../AuthHeading ";

import CheckIcon from "@/assets/icons/check.svg";

const SuccessStep = () => {
  return (
    <>
      <div className="absolute left-0 top-0 w-full h-full bg-[#DDE2DC] z-30 flex flex-col gap-y-4 justify-center items-center overflow-hidden">
        <div className="relative flex justify-center items-center">
          {[...Array(10)].map((_, i) => (
            <div className={`animate animate-num-${i + 1}`} key={i}></div>
          ))}
          <img src={CheckIcon} alt="check-icon" className="w-[14px] h-[14px]" />
        </div>
        <div className="auth-box">
          <AuthHeading
            head={"تم بنجاح"}
            desc={["تم تغيير رقمك السري بنجاح.", "إضغط بالأسفل لتسجيل الدخول."]}
          />
          <Link to="/signin" className="auth-button mt-2 block w-full text-center">
            متابعة
          </Link>
        </div>
      </div>
    </>
  );
};

export default SuccessStep;
