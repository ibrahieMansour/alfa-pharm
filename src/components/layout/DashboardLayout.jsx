import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import { useMediaQuery } from "@uidotdev/usehooks";
import { useClickOutside } from "@/hooks/use-click-outside";

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

import { cn } from "@/utils/cn";
const DashboardLayout = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);
  const sidebarRef = useRef(null);
  const location = useLocation(); // ⬅️ get current route

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useClickOutside([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) setCollapsed(true);
  });

  useEffect(() => {
    if (!isDesktopDevice) setCollapsed(true);
  }, [location]);

  return (
    <>
      <div className="dashboard-layout h-dvh max-h-dvh bg-[#DDE2DC] overflow-hidden">
        <div
          className={cn(
            "pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity",
            !collapsed && "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30"
          )}
        />
        <Sidebar
          ref={sidebarRef}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          isDesktopDevice={isDesktopDevice}
        />
        <div
          className={cn(
            "transition-[margin] duration-300",
            collapsed ? "md:mr-[70px]" : "md:mr-[200px]",
            // `md:mr-[${collapsed ? 70 : 200}px]`
          )}
        >
          <Header
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            isDesktopDevice={isDesktopDevice}
          />
          <div className="h-[calc(100dvh-60px)] flex flex-col">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
