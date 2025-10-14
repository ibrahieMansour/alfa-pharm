import { cn } from "@/utils/cn";

const ErrorMessage = ({ error, message, valid = false }) => (
  <div className={cn("text-[10px] text-center", valid ? "text-[#5eb756]" : "text-red-600")}>
    <p>&nbsp;{error && message}&nbsp;</p>
  </div>
);

export default ErrorMessage;
