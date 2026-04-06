import React, { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Bell,
  User,
  Settings,
  LogOut,
  Shield,
  ChartNoAxesCombined,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export const NavBar = ({ toggleSidebar, sidebarOpen, isMobile }) => {
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [role, setRole] = useState("User");
  const menuRef = useRef();
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-16 bg-gray-900 border-b-2 border-white  text-white flex items-center justify-between px-6 shadow-lg z-50">
      {/* left */}
      <div className="flex items-center gap-4">
        {isMobile && (
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-800 transition"
          >
            {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        )}

        <h1
          onClick={() => handleNavigate("/")}
          className="flex gap-1 items-center text-xl font-bold tracking-wide cursor-pointer hover:opacity-80 transition"
        >
          <ChartNoAxesCombined size={24} /> CapitalView
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-5 relative" ref={menuRef}>
        {/* Notification */}
        <motion.div whileTap={{ scale: 0.9 }}>
          <Bell className="cursor-pointer hover:text-gray-300 transition" />
        </motion.div>

        {/* USER */}
        <div
          onClick={() => setOpenUserMenu(!openUserMenu)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-8 h-8 rounded-full border border-gray-600"
          />
          <span className="hidden sm:block text-sm">Alok Ranjan</span>
        </div>

        {/* DROPDOWN */}
        <AnimatePresence>
          {openUserMenu && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-14 w-52 bg-gray-800 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="flex flex-col">
                {/* USER INFO */}
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-semibold">Alok Ranjan</p>
                  <p className="text-xs text-gray-400">alokranjan@gmail.com</p>
                </div>

                {/* ROLE SWITCH */}
                <div className="px-2 py-2 border-b border-gray-700">
                  <p className="text-xs text-gray-400 px-2 mb-1">Switch Role</p>

                  {["User", "Admin"].map((r) => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                        role === r ? "bg-gray-700" : "hover:bg-gray-700"
                      }`}
                    >
                      {r === "User" ? <User size={16} /> : <Shield size={16} />}
                      {r}
                    </button>
                  ))}
                </div>

                {/* ACTIONS */}
                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition">
                  <User size={16} /> Profile
                </button>

                <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-700 transition">
                  <Settings size={16} /> Settings
                </button>

                <button
                  onClick={() => handleNavigate("/")}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-red-600/80 transition text-red-400"
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
