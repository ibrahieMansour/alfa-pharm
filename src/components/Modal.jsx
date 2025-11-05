import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { cn } from "@/utils/cn";
import { useState } from "react";

export const Modal = ({
  title = "",
  icon = null,
  footer = true,
  confirmText = "تأكيد",
  theme = "success",
  width = 400,
  onClose = () => {},
  onConfirm = () => {},
  loading = false,
  loadingText = "جارى التأكيد...",
  children,
  ...props
}) => {
  const [animateOut, setAnimateOut] = useState(false);

  const handleClose = () => {
    setAnimateOut(true);
    setTimeout(onClose, 300);
  };

  const themeColors = {
    danger: "bg-[#D22F27]",
    outline_danger: "border border-[#D22F27] text-[#D22F27] bg-transparent",
    success: "bg-[#5EB756]",
  };

  const modalContent = (
    <div
      id="modal-overlay"
      className={cn(
        "bg-black/50 fixed inset-0 z-[150] flex items-center justify-center",
        animateOut ? "animate_fadeOut" : "animate_fadeIn"
      )}
      onClick={(e) => e.target.id === "modal-overlay" && handleClose()}
    >
      <div
        id="modal"
        className="bg-[#DDE2DC] text-black rounded-lg shadow-lg flex flex-col"
        style={{ width, maxWidth: "95vw" }}
        {...props}
      >
        {title && (
          <header className="relative flex items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              {icon && (
                <div className="p-2 bg-white rounded-lg">
                  <img src={icon} alt="modal-icon" className="w-4 h-4" />
                </div>
              )}
              <h5 className="font-semibold text-[12px]">{title}</h5>
            </div>
            <button
              aria-label="Close"
              className="text-2xl font-semibold text-gray-400 hover:text-red-700 cursor-pointer"
              onClick={handleClose}
            >
              &times;
            </button>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-[#E97E39] to-[#5EB756]"></div>
          </header>
        )}

        <main className="p-4">{children}</main>

        {footer && (
          <footer
            className={cn(
              "mx-4 py-3 flex gap-2",
              theme === "success" && "border-t border-[#5EB756]"
            )}
          >
            <button
              className="flex-1 text-[12px] font-semibold text-[#888888] py-1 rounded-lg border border-[#888888] bg-transparent transition hover:bg-[#888888] hover:text-white"
              onClick={handleClose}
            >
              إلغاء
            </button>
            <button
              className={cn(
                `flex-1 text-[12px] font-semibold text-white py-1 rounded-lg transition ${themeColors[theme]}`,
                loading && "opacity-70"
              )}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? loadingText : confirmText}
            </button>
          </footer>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.getElementById("portal-root"));
};

Modal.propTypes = {
  width: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.elementType,
  children: PropTypes.node.isRequired,
  footer: PropTypes.bool,
  confirmText: PropTypes.string,
  theme: PropTypes.oneOf(["danger", "success"]),
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
};
