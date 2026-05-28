import React from "react";
import { useNavigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

import {
  LayoutDashboard,
  FileCode2,
  Heart,
  User,
  LogOut,
  Settings,
  Bookmark,
  X,
} from "lucide-react";

const SideBar = ({ sidebarOpen, setSidebarOpen, name }) => {
  const navigate = useNavigate();
  const {logout} = useAuth();
  const navItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      label: "Create Snippet",
      icon: <Bookmark size={20} />,
      path: "/create",
    },
    {
      label: "Favorites",
      icon: <Heart size={20} />,
      path: "/snippets/favorites",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-90 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-100
          h-screen w-64
          bg-base-100 dark:bg-[#111827]
          border-r border-base-content/10
          transition-transform duration-300
          
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full px-5 py-6">
          {/* Mobile Close */}
          <div className="flex justify-end lg:hidden mb-2">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-full hover:bg-base-content/10 text-base-content"
            >
              <X size={24} />
            </button>
          </div>

          {/* Profile */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary text-primary-content flex items-center justify-center text-3xl font-bold shadow-lg">
              {name?.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-5 text-2xl font-bold">Welcome Back!</h2>

            <p className="text-base-content/60 mt-1">{name}</p>
          </div>

          {/* Navigation */}
          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <button
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className="
                    w-full flex items-center gap-3
                    px-4 py-3 rounded-2xl
                    hover:bg-primary/10 hover:text-primary
                    transition-all duration-200
                    text-base font-medium
                  "
                >
                  {item.icon}

                  {item.label}
                </button>
              </li>
            ))}

            <div className="divider my-2"></div>

            {/* Profile */}
            <li>
              <button
                onClick={() => navigate("/profile")}
                className="
                  w-full flex items-center gap-3
                  px-4 py-3 rounded-2xl
                  hover:bg-primary/10 hover:text-primary
                  transition-all duration-200
                  text-base font-medium
                "
              >
                <User size={20} />
                My Profile
              </button>
            </li>

            {/* Logout */}
            <li>
              <button
              onClick={logout}
              className="
                w-full flex items-center gap-3
                px-4 py-3 rounded-2xl
                text-error hover:bg-error/10
                transition-all duration-200
                text-base font-medium
                "
              >
                <LogOut size={20} />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
