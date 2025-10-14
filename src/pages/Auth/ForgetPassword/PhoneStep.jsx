import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthHeading from "../AuthHeading ";
import PhoneInput from "../PhoneInput ";
import ErrorMessage from "../ErrorMessage";

import RightArrow from "@/assets/icons/right-arrow.svg";

const PhoneStep = ({ setStep, phone, setPhone }) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const phonePattern = /^01[0125][0-9]{8}$/;
  useEffect(() => {
    if (!phone || !phonePattern.test(phone)) {
      setErrorMessage("رقم الهاتف غير صحيح");
    } else {
      setErrorMessage("");
    }
  }, [phone]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(true);
    if (!phone || !phonePattern.test(phone)) {
      setErrorMessage("رقم الهاتف غير صحيح");
      return;
    }

    setError(false);
    setErrorMessage("");
    setIsDisabled(true);

    setTimeout(() => {
      console.log("phone : ", phone);

      setStep((prev) => prev + 1);
      //finally
      setIsDisabled(false);
    }, 3000);
  };

  return (
    <>
      <div className="auth-box">
        <AuthHeading head={"هل نسيت كلمة السر؟"} desc={["لا داعي للقلق,سنرسل لك التعليمات "]} />

        <form onSubmit={handleSubmit}>
          <PhoneInput
            phone={phone}
            setPhone={setPhone}
            error={error}
            label="أدخل رقم هاتفك المحمول"
          />

          <ErrorMessage error={error} message={errorMessage} />

          <button type="submit" className="auth-button mt-2 mb-3" disabled={isDisabled}>
            {isDisabled ? "جارى الارسال..." : "متابعة"}
          </button>

          <Link to="/signin" className="auth-link flex justify-center items-center gap-x-2">
            <img src={RightArrow} alt="right-arrow" className="w-2.5 h-2.5" />
            العوده لتسجيل الدخول
          </Link>
        </form>
      </div>
    </>
  );
};

export default PhoneStep;
