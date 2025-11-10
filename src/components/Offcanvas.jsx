import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { cn } from "@/utils/cn";
import { useState } from "react";

export const Offcanvas = ({ title, height = "auto", onClose = () => {}, children }) => {
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
        style={{ height }}
      >
        <div className="p-6">
          <div className="w-8 h-[5px] mb-6 rounded-full mx-auto bg-gradient-to-r from-[#E97E39] to-[#5EB756]" />
          <h4 className="text-[#31373D] text-sm font-semibold mb-3 text-center">{title}</h4>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

Offcanvas.propTypes = {};
