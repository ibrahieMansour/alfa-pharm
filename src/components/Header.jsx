import { Link } from "react-router-dom";

// import PropTypes from "prop-types";
import { cn } from "@/utils/cn";

import Avatar from "@/assets/images/avatar.png";
import MenuBars from "@/assets/icons/menu-bars.svg";
import BellIcon from "@/assets/icons/bell.svg";

export const Header = ({ collapsed, setCollapsed, isDesktopDevice }) => {
  return (
    <header
      className={cn(
        "relative z-10 flex h-[60px] items-center justify-between bg-inherit px-4 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-[#E97E39] after:to-[#5EB756]"
        // isDesktopDevice ? "z-[101]" : "z-[10]"
      )}
    >
      <div className="flex items-center gap-x-3">
        {/* <button
          className={cn("btn-ghost", isDesktopDevice && "absolute-btn")}
          onClick={() => setCollapsed(!collapsed)}
        >
          <img
            src={MenuBars}
            alt=""
            className={cn("size-4 transition-transform rotate-180", collapsed && "")}
          />
        </button> */}
        <button className="btn-ghost" onClick={() => setCollapsed(!collapsed)}>
          <img src={MenuBars} alt="menu-bars-icon" className="w-4 h-3 rotate-180" />
        </button>
      </div>
      <div className="flex items-center gap-x-3">
        <Link to="/orders" className="btn-ghost relative">
          <img src={BellIcon} alt="" className="w-5 h-5" />
          <div className="absolute w-3 h-3 bg-red-600 right-0 top-0 translate-x-1/4 -translate-y-1/4 rounded-full"></div>
        </Link>
        <div className="size-10 rounded-full overflow-hidden border-2 border-green-600">
          <img src={Avatar} alt="user-avatar" className="w-full h-full" />
        </div>
      </div>
    </header>
  );
};

// Header.propTypes = {
//   collapsed: PropTypes.bool,
//   setCollapsed: PropTypes.func,
// };
