import React, { useState } from "react";
import PhoneStep from "./PhoneStep";
import CodeStep from "./CodeStep";
import NewPasswordStep from "./NewPasswordStep";
import SuccessStep from "./SuccessStep";

const ForgetPasswordPage = () => {
  const [step, setStep] = useState(4);
  const [phone, setPhone] = useState("01020515897");
  return (
    <>
      {step === 1 && <PhoneStep setStep={setStep} phone={phone} setPhone={setPhone} />}

      {step === 2 && <CodeStep setStep={setStep} phone={phone} />}

      {step === 3 && <NewPasswordStep setStep={setStep} />}

      {step === 4 && <SuccessStep setStep={setStep} />}
    </>
  );
};

export default ForgetPasswordPage;
