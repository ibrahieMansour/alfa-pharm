import PhoneIcon from "@/assets/icons/phone.svg";
import { cn } from "@/utils/cn";

const PhoneInput = ({ phone, setPhone, error, label }) => {
  const phonePattern = /^01[0125][0-9]{8}$/;
  return (
    <div className="mt-3">
      <label htmlFor="phone-input" className="label">
        {label}
      </label>
      <div className="relative">
        <div className="input-phone-icon">
          <img src={PhoneIcon} alt="phone-icon" className="w-5 h-5" />
        </div>
        <input
          type="text"
          id="phone-input"
          className={cn("input input--ps", error && !phonePattern.test(phone) ? "error" : "valid")}
          value={phone}
          onKeyDown={(e) => {
            if (e.key === " ") e.preventDefault();
          }}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PhoneInput;
