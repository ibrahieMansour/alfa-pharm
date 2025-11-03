import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { cn } from "@/utils/cn";
import { useState } from "react";

export const Offcanvas = ({ height = 400, onClose = () => {}, children }) => {
  const [animateOut, setAnimateOut] = useState(false);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(onClose, 300);
  };

  return createPortal(
    <div
      id="offcanvas-overlay"
      className={cn(
        "fixed inset-0 z-[150] bg-black/50 flex items-end justify-center",
        animateOut ? "animate_fadeOut" : "animate_fadeIn"
      )}
      onClick={(e) => e.target.id === "offcanvas-overlay" && handleClose()}
    >
      <div
        id="offcanvas"
        className={cn(
          "w-full bg-[#DDE2DC] text-black rounded-t-2xl shadow-lg flex flex-col",
          animateOut ? "animate_slideOutDown" : "animate_slideInUp"
        )}
        style={{ height, maxHeight: "50%" }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

Offcanvas.propTypes = {};
