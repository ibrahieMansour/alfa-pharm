import { forwardRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "@/features/auth/authThunks";

import { sideBarNav } from "@/constants/index";
import { cn } from "@/utils/cn";
import { Modal } from "./Modal";

import Logo from "@/assets/icons/logo.svg";
import Logout from "@/assets/icons/logout.svg";
import LogoutModalIcon from "@/assets/icons/logout-modal-icon.svg";

export const Sidebar = forwardRef(({ collapsed, setCollapsed, isDesktopDevice }, ref) => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const [isOpen, setIsOpen] = useState(false);

  const [hoverExpanded, setHoverExpanded] = useState(false);

  const navigate = useNavigate("");

  const handleMouseEnter = () => {
    if (isDesktopDevice && collapsed) {
      setCollapsed(false);
      setHoverExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktopDevice && hoverExpanded) {
      setCollapsed(true);
      setHoverExpanded(false);
    }
  };

  return (
    <>
      <aside
        ref={ref}
        className={cn(
          "fixed z-[100] flex h-full w-[240px] flex-col overflow-x-hidden border-l border-[#5EB756] bg-inherit [transition:_width_300ms_cubic-bezier(0.4,_0,_0.2,_1),_left_300ms_cubic-bezier(0.4,_0,_0.2,_1),_background-color_150ms_cubic-bezier(0.4,_0,_0.2,_1),_border_150ms_cubic-bezier(0.4,_0,_0.2,_1)] ",
          collapsed ? "md:w-[70px] md:items-center" : "md:w-[240px]",
          collapsed ? "max-md:-right-full" : "max-md:right-0"
        )}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-center gap-x-1 p-3">
          <img src={Logo} alt="Logoipsum" className="w-10 h-10" />
          {!collapsed && (
            <p className="text-lg font-medium text-[#5EB756]">
              Alfα<span className="text-[#E97E39]">Pharm</span>
            </p>
          )}
        </div>
        <div className="flex w-full flex-1 flex-col gap-y-4 overflow-y-auto overflow-x-hidden p-3 [scrollbar-width:_thin]">
          <nav className={cn("sidebar-group", collapsed && "md:items-center")}>
            {sideBarNav.map((e) => (
              <NavLink
                key={e.title}
                to={e.path}
                className={cn("sidebar-item", collapsed && "md:w-[50px]")}
              >
                <e.icon className="w-5 h-5" />
                {!collapsed && <p className="whitespace-nowrap">قائمة {e.title}</p>}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-3">
          <button
            className={cn("sidebar-item hover:border-r-[#FA0404]", collapsed && "md:w-[45px]")}
            onClick={() => setIsOpen(true)}
          >
            <img src={Logout} alt="Logout" className="w-5 h-5" />
            {!collapsed && <p className="whitespace-nowrap text-[#FA0404]">تسجيل الخروج</p>}
          </button>
        </div>
      </aside>

      {/* logout modal */}
      {isOpen && (
        <Modal
          theme={"danger"}
          confirmText={"تسجيل الخروج"}
          onClose={() => setIsOpen(false)}
          onConfirm={() => dispatch(logoutAdmin())}
          loading={loading}
        >
          <div className="flex flex-col items-center gap-y-1 sm:gap-y-4">
            <div className="inline-block bg-[#f11b1b14] p-3 sm:p-4 rounded-2xl">
              <img src={LogoutModalIcon} alt="logout-modal-icon" className="w-6 h-6" />
            </div>
            <h5 className="font-bold text-sm">تسجيل الخروج</h5>
            <p className="font-normal text-xs">هل انت متأكد من تسجيل الخروج؟</p>
          </div>
        </Modal>
      )}
    </>
  );
});

Sidebar.displayName = "Sidebar";

Sidebar.propTypes = {
  collapsed: PropTypes.bool,
};
