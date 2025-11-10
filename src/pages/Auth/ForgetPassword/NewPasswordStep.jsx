import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AuthHeading from "../AuthHeading ";
import PasswordInput from "../PasswordInput ";
import ErrorMessage from "../ErrorMessage";

import RightArrow from "@/assets/icons/right-arrow.svg";
import RightAngle from "@/assets/icons/right-angle.svg";

const NewPasswordStep = ({ setStep }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (!password || !confirmPassword) {
      setErrorMessage("الرجاء ملئ جميع البيانات");
      setValid(false);
    } else if (password !== confirmPassword) {
      setErrorMessage("كلمة المرور غير متطابقه");
      setValid(false);
    } else {
      setErrorMessage("كلمة المرور متطابقه");
      setValid(true);
    }
  }, [password, confirmPassword]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(true);
    if (!password || !confirmPassword) {
      setErrorMessage("الرجاء ملئ جميع البيانات");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("كلمة المرور غير متطابقه");
      return;
    }

    setError(false);
    setErrorMessage("");
    setIsDisabled(true);

    setTimeout(() => {

      setStep((prev) => prev + 1);
      //finally
      setIsDisabled(false);
    }, 3000);
  };

  return (
    <>
      <div className="w-full h-full flex justify-center items-center relative">
        <div className="auth-box">
          <AuthHeading
            head={"ادخل رقم سري جديد"}
            desc={["يجب أن لا يطابق الأرقام السرية القديمة"]}
          />

          <form onSubmit={handleSubmit}>
            <PasswordInput
              password={password}
              setPassword={setPassword}
              error={error}
              label="كلمة المرور"
            />

            <PasswordInput
              password={confirmPassword}
              setPassword={setConfirmPassword}
              error={error}
              label="تأكيد كلمه المرور"
              id="confirmPassword"
            />

            <ErrorMessage error={error} message={errorMessage} valid={valid} />

            <button type="submit" className="auth-button mt-2 mb-3" disabled={isDisabled}>
              {isDisabled ? "جارى التغييــر..." : "تغييــر"}
            </button>

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

export default NewPasswordStep;
