import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import PropTypes from "prop-types";

import { fetchNotifications } from "@/features/notifications/notificationsThunks";
import { selectUnreadNotificationsCount } from "@/features/notifications/notificationsSlice";

import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/utils/cn";
import NotificationsDropdown from "@/components/NotificationsDropdown";

import Avatar from "@/assets/images/avatar.png";
import MenuBars from "@/assets/icons/menu-bars.svg";
import BellIcon from "@/assets/icons/bell.svg";

export const Header = ({ collapsed, setCollapsed, isDesktopDevice }) => {
  const dispatch = useDispatch();
  const { admin } = useSelector(state => state.auth)
  const unreadCount = useSelector(selectUnreadNotificationsCount);

  const [openDropdown, setOpenDropdown] = useState(false);
  const bellRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchNotifications());
    const timer = setInterval(() => {
      dispatch(fetchNotifications());
    }, 10000);
    return () => clearInterval(timer);
  }, [dispatch]);

  useClickOutside([dropdownRef, bellRef], () => setOpenDropdown(false));
  return (
    <header
      className={cn(
        "relative z-[20] flex h-[60px] items-center justify-between bg-inherit px-4 after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-full after:bg-gradient-to-r after:from-[#E97E39] after:to-[#5EB756]"
      )}
    >
      <div className="flex items-center gap-x-3">
        <button className="btn-ghost" onClick={() => setCollapsed(!collapsed)}>
          <img src={MenuBars} alt="menu-bars-icon" className="w-4 h-3 rotate-180" />
        </button>
      </div>
      <div className="flex items-center gap-x-3 relative">
        <div className="relative">
          <button
            ref={bellRef}
            type="button"
            className="btn-ghost relative"
            onClick={() => setOpenDropdown((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={openDropdown}
          >
            <img src={BellIcon} alt="notifications" className={`w-5 h-5 transition-transform ${openDropdown ? "-rotate-45" : ""}`} />
            {unreadCount > 0 && (
              <div className="absolute -right-1 -top-1 min-w-4 h-4 px-1 rounded-full bg-red-600 text-[10px] leading-4 text-white flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </div>
            )}
          </button>

          <NotificationsDropdown
            ref={dropdownRef}
            open={openDropdown}
            onClose={() => setOpenDropdown(false)}
            anchorRef={bellRef}
          />
        </div>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `size-10 rounded-full overflow-hidden border-2 ${isActive ? "border-[#e97e39]" : "border-green-600"
            }`
          }
        >
          <img src={admin?.image || Avatar} alt="user-avatar" className="w-full h-full" onError={(e) => (e.target.src = Avatar)} />
        </NavLink>
      </div>
    </header>
  );
};

// Header.propTypes = {
//   collapsed: PropTypes.bool,
//   setCollapsed: PropTypes.func,
// };
