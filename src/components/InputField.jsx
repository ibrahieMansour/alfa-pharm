// const InputField = ({ id, label, type = "text", value, onChange }) => {
//   return (
//     <div className="field">
//       <label htmlFor={id} className="label">
//         {label}
//       </label>
//       <input id={id} type={type} className="input" value={value} onChange={onChange} />
//     </div>
//   );
// };

// export default InputField;

import { useState } from "react";
import EyeIcon from "@/assets/icons/eye.svg";
import EyeSlashIcon from "@/assets/icons/eye-slash.svg";

const InputField = ({ id, label, type = "text", maxLength = 50, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="field relative">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative flex-1">
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          className="input"
          value={value}
          onChange={onChange}
          maxLength={maxLength}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white pr-1 border-r"
          >
            <img
              src={showPassword ? EyeSlashIcon : EyeIcon}
              alt="toggle password visibility"
              className="w-4 h-4 opacity-70 hover:opacity-100"
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default InputField;
