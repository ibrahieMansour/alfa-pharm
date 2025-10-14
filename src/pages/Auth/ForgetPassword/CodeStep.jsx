import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthHeading from "../AuthHeading ";
import OtpInputs from "../OtpInputs";
import ErrorMessage from "../ErrorMessage";

import RightArrow from "@/assets/icons/right-arrow.svg";
import RightAngle from "@/assets/icons/right-angle.svg";

const CodeStep = ({ setStep, phone }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!otp || otp.length !== 4) {
      setErrorMessage("الرجاء ملئ جميع الخانات بشكل صحيح");
    } else {
      setErrorMessage("");
    }
  }, [otp]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(true);
    if (!otp || otp.length !== 4) {
      setErrorMessage("الرجاء ملئ جميع الخانات بشكل صحيح");
      return;
    }

    setError(false);
    setErrorMessage("");
    setIsDisabled(true);

    setTimeout(() => {
      setStep((prev) => prev + 1);
      setOtp("");
      //finally
      setIsDisabled(false);
    }, 3000);
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center relative">
        <div className="auth-box">
          <AuthHeading
            head={"تحقق من رسائلك النصية"}
            desc={[
              "لقد ارسلنا رقم سري متغير إلى",
              phone.slice(-4) + phone.slice(0, -4).replace(/\d/g, "*"),
            ]}
          />

          <form onSubmit={handleSubmit}>
            <OtpInputs otp={otp} setOtp={setOtp} error={error} />

            <ErrorMessage error={error} message={errorMessage} />

            <button type="submit" className="auth-button mt-2 mb-3" disabled={isDisabled}>
              {isDisabled ? "جارى التحقق..." : "متابعة"}
            </button>

            <p className="text-center mb-3">
              <span className="text-[10px] font-normal text-gray-600">لم تصلك رسالة؟</span>
              <button role="button" className="auth-link">
                اضغط هنا لإعادة الإرسال
              </button>
            </p>

            <Link to="/signin" className="auth-link flex justify-center items-center gap-x-2">
              <img src={RightArrow} alt="right-arrow" className="w-2.5 h-2.5" />
              العوده لتسجيل الدخول
            </Link>
          </form>
        </div>
        <button
          role="button"
          onClick={() => setStep(1)}
          className="absolute right-16 max-sm:right-8 top-16 w-9 h-9 bg-[rgba(147,160,185,0.09)] rounded-full flex justify-center items-center"
        >
          <img src={RightAngle} alt="right-angle" className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};

export default CodeStep;
