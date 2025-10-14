import OTPInput from "react-otp-input";
import { cn } from "@/utils/cn";

const OtpInputs = ({ otp, setOtp, error }) => {
  return (
    <>
      {/* focus:ring-blue-500 focus:border-blue-500 */}
      <OTPInput
        value={otp}
        onChange={setOtp}
        numInputs={4}
        placeholder="----"
        containerStyle="otp-container"
        renderInput={(props, index) => (
          <input {...props} className={cn("otp-input", !otp[index] && error ? "error" : "valid")} />
        )}
      />
    </>
  );
};

export default OtpInputs;
