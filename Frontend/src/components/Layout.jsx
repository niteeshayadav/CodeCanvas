import { Outlet } from "react-router";
import Navbar from "./Navbar.jsx";
import Sidebar from "./SideBar.jsx";
import React, { useState } from "react";
import {useAuth} from "../context/AuthContext";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {loading} = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  return (
    <div className="h-screen w-full flex bg-base-300 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex flex-col flex-1 lg:ml-64 overflow-hidden">
        {/* Navbar */}
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-base-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
