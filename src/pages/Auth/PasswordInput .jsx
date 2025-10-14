import { useState } from "react";
import { cn } from "@/utils/cn";

import Eye from "@/assets/icons/eye.svg";
import EyeSlash from "@/assets/icons/eye-slash.svg";

const PasswordInput = ({ password, setPassword, error, label, id = "password" }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mt-3">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        <div className="input-password-icon" onClick={() => setShowPassword(!showPassword)}>
          <img src={showPassword ? Eye : EyeSlash} alt="show password" className="w-5 h-5" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          className={cn("input input--pe", !password && error ? "error" : "valid")}
          value={password}
          onKeyDown={(e) => {
            if (e.key === " ") e.preventDefault();
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </div>
  );
};

export default PasswordInput;
