import { forwardRef, useState } from "react";
import { NavLink } from "react-router-dom";

import { cn } from "@/utils/cn";

// import PropTypes from "prop-types";

import Logo from "@/assets/icons/logo.svg";
import Products from "@/assets/icons/products.svg?react";
import Orders from "@/assets/icons/orders.svg?react";
import Users from "@/assets/icons/users.svg?react";
import Staff from "@/assets/icons/staff.svg?react";
import Logout from "@/assets/icons/logout.svg";

const x = [
  {
    title: "المنتجات",
    icon: Products,
    path: "/products",
  },
  {
    title: "الطلبات",
    icon: Orders,
    path: "/orders",
  },
  {
    title: "المستخدمين",
    icon: Users,
    path: "/customers",
  },
  {
    title: "المسؤولين",
    icon: Staff,
    path: "/staff",
  },
];

export const Sidebar = forwardRef(({ collapsed, setCollapsed, isDesktopDevice }, ref) => {
  const [hoverExpanded, setHoverExpanded] = useState(false);

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
          {x.map((e) => (
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
        <button className={cn("sidebar-item hover:border-r-[#FA0404]", collapsed && "md:w-[45px]")}>
          <img src={Logout} alt="Logout" className="w-5 h-5" />
          {!collapsed && <p className="whitespace-nowrap text-[#FA0404]">تسجيل الخروج</p>}
        </button>
      </div>
    </aside>
  );
});

Sidebar.displayName = "Sidebar";

// Sidebar.propTypes = {
//   collapsed: PropTypes.bool,
// };
