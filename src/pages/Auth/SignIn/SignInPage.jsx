import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, getAdminProfile } from "@/features/auth/authThunks";

import AuthHeading from "../AuthHeading";
import PhoneInput from "../PhoneInput";
import PasswordInput from "../PasswordInput";
import ErrorMessage from "../ErrorMessage";
import axios from "axios";

const SignInPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate("");

  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    // setValid(true);

    // if (!phone || !password) return;
    // if (!phonePattern.test(phone)) return;

    // setValid(false);
    // setErrorMessage("");

    dispatch(loginAdmin({ phone, password }))
      .unwrap()
      .then(() => {
        setPhone("");
        setPassword("");
        navigate("/orders");
      })
      .catch(() => {
        setValid(true);
        setErrorMessage("الهاتف او كلمه المرور غير صحيح");
      });
  };

  return (
    <>
      <div className="auth-box">
        <AuthHeading
          head={"سجل الدخول إلى حسابك"}
          desc={["أهلاً بك مرهً أخرى! من فضلك املأ بياناتك"]}
        />

        <form onSubmit={handleSubmit}>
          <PhoneInput phone={phone} setPhone={setPhone} error={valid} label="رقم الهاتف" />

          <PasswordInput
            password={password}
            setPassword={setPassword}
            error={valid}
            label="كلمة المرور"
          />

          <ErrorMessage error={valid} message={errorMessage} />

          <button type="submit" className="auth-button mt-3" disabled={loading}>
            {loading ? "جارى التسجيل..." : "تسجيل الدخول"}
          </button>
        </form>
      </div>
    </>
  );
};

export default SignInPage;
