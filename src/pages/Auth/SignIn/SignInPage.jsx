import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthHeading from "../AuthHeading ";
import PhoneInput from "../PhoneInput ";
import PasswordInput from "../PasswordInput ";
import ErrorMessage from "../ErrorMessage";

const SignInPage = () => {
  const navigate = useNavigate("");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  const phonePattern = /^01[0125][0-9]{8}$/;
  useEffect(() => {
    if (!phone || !password) {
      setErrorMessage("الرجاء ملئ جميع البيانات");
    } else if (!phonePattern.test(phone)) {
      setErrorMessage("رقم الهاتف غير صحيح");
    } else {
      setErrorMessage("");
    }
  }, [phone, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(true);
    if (!phone || !password) {
      setErrorMessage("الرجاء ملئ جميع البيانات");
      return;
    }
    if (!phonePattern.test(phone)) {
      setErrorMessage("رقم الهاتف غير صحيح");
      return;
    }

    setError(false);
    setErrorMessage("");
    setIsDisabled(true);

    setTimeout(() => {
      console.log("phone : ", phone);
      console.log("password : ", password);

      setPhone("");
      setPassword("");
      navigate("/products");
      //finally
      setIsDisabled(false);
    }, 3000);
  };

  return (
    <>
      <div className="auth-box">
        <AuthHeading
          head={"سجل الدخول إلى حسابك"}
          desc={["أهلاً بك مرهً أخرى! من فضلك املأ بياناتك"]}
        />

        <form onSubmit={handleSubmit}>
          <PhoneInput phone={phone} setPhone={setPhone} error={error} label="رقم الهاتف" />

          <PasswordInput
            password={password}
            setPassword={setPassword}
            error={error}
            label="كلمة المرور"
          />

          <ErrorMessage error={error} message={errorMessage} />

          <div className="flex flex-row-reverse mb-3">
            <Link to="/forget-password" className="auth-link">
              هل نسيت كلمة السر؟
            </Link>
          </div>

          <button type="submit" className="auth-button" disabled={isDisabled}>
            {isDisabled ? "جارى التسجيل..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignInPage;
