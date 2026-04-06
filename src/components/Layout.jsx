// components/Layout.jsx
import React, { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { NavBar } from "./NavBar";

export const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div>
      <NavBar
        toggleSidebar={() => setSidebarOpen((prev) => !prev)}
        sidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />

      <div className="flex pt-16">
        <Sidebar
          isOpen={isMobile ? sidebarOpen : true}
          toggleSidebar={() => setSidebarOpen(false)}
          collapsed={collapsed}
          setCollapsed={setCollapsed}
        />

        <main
          className={`flex-1 bg-gray-100 min-h-screen p-6 transition-all duration-300
          ${isMobile ? "ml-0" : collapsed ? "md:ml-[80px]" : "md:ml-[260px]"}`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};
