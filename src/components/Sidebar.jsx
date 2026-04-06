import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Sidebar = ({ isOpen, toggleSidebar, collapsed, setCollapsed }) => {
  const [role, setRole] = useState("User");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, to: "/dashboard" },
    { name: "Wallet", icon: Wallet, to: "/wallet" },
  ];

  return (
    <>
      {/* OVERLAY (MOBILE) */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            onClick={toggleSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-30"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <AnimatePresence>
        {(isOpen || !isMobile) && (
          <motion.div
            initial={{ x: -260 }}
            animate={{
              x: isMobile ? (isOpen ? 0 : -260) : 0,
              width: isMobile ? 260 : collapsed ? 80 : 260,
            }}
            exit={{ x: -260 }}
            transition={{ duration: 0.3 }}
            className="fixed pt-3 top-16 left-0 h-[calc(100vh-64px)] bg-gray-900 text-white flex flex-col justify-between shadow-xl z-40"
          >
            {/* TOP */}
            <div className="overflow-visible">
              <div className="mx-3 mb-4 p-3 bg-gray-800 rounded-xl flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="profile"
                  className="w-8 h-8 rounded-full border border-gray-600"
                />

                {!collapsed && !isMobile && (
                  <div>
                    <p className="text-sm font-semibold">Alok Ranjan</p>
                    <p className="text-xs text-gray-400">
                      alokranjan@gmail.com
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                {menuItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        if (item.to) navigate(item.to);
                        if (isMobile) toggleSidebar(); // Close sidebar on mobile after click
                      }}
                      className="relative group flex items-center gap-3 px-4 py-2 hover:bg-gray-800 cursor-pointer rounded-xl mx-2"
                    >
                      <Icon size={20} />
                      {!collapsed && <span>{item.name}</span>}
                      {collapsed && !isMobile && (
                        <span className="absolute left-16 z-50 bg-gray-800 text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition">
                          {item.name}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* BOTTOM */}
            <div className="p-4 border-t border-gray-700">
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="bg-gray-800 p-2 rounded-xl flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  {role === "User" ? <User size={16} /> : <Shield size={16} />}
                  {!collapsed && <span>{role}</span>}
                </div>

                {!collapsed && <ChevronRight size={16} />}
              </div>

              {openDropdown && (
                <div className="mt-2 bg-gray-800 rounded-xl overflow-hidden">
                  {["User", "Admin"].map((r) => (
                    <div
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setOpenDropdown(false);
                      }}
                      className="p-2 flex items-center gap-2 hover:bg-gray-700 cursor-pointer"
                    >
                      {r === "User" ? <User size={16} /> : <Shield size={16} />}
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COLLAPSE BUTTON */}
            {!isMobile && (
              <div className="absolute top-1/2 -right-2  -translate-y-1/2">
                <button
                  onClick={() => setCollapsed(!collapsed)}
                  className="    p-1 rounded-full"
                >
                  {collapsed ? <ChevronRight /> : <ChevronLeft />}
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
