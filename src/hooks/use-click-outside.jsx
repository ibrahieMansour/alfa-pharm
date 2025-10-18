import { useEffect } from "react";

export const useClickOutside = (refs, callback) => {
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isOutside = refs.every((ref) => !ref?.current?.contains(event.target));

      if (isOutside && typeof callback === "function") {
        callback(event);
      }
    };

    document.addEventListener("touchstart", handleOutsideClick);
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("touchstart", handleOutsideClick);
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [callback, refs]);
};
