import React from "react";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { Menu, Search, Heart, Plus, Code2 } from "lucide-react";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  
  const handleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="navbar bg-base-100/90 backdrop-blur-md border-b border-base-content/10 px-4 md:px-6 lg:px-8 sticky top-0 z-50">
      {/* Left */}
      <div className="flex items-center flex-1 gap-2">
        {/* Mobile Menu */}
        <button className="btn btn-ghost btn-circle lg:hidden"
          onClick={handleSidebar}>
          <Menu size={22} />
        </button>

        {/* Logo */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
            <Code2 size={20} />
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight">
            Code
            <span className="text-primary">Canvas</span>
          </h1>
        </div>
      </div>

      <SearchBar />

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-2">
        <button
          onClick={() => navigate("/dashboard")}
          className="btn btn-ghost rounded-xl"
        >
          Dashboard
        </button>

        <button
          onClick={() => navigate("/snippets/favorites")}
          className="btn btn-ghost gap-2 rounded-xl"
        >
          <Heart size={18} />
          Favorites
        </button>

        <button
          onClick={() => navigate("/create")}
          className="btn btn-primary gap-2 rounded-2xl shadow-md"
        >
          <Plus size={18} />
          Create Snippet
        </button>
      </div>

      {/* Mobile Create Button */}
      <div className="lg:hidden">
        <button
          onClick={() => navigate("/create")}
          className="btn btn-primary btn-circle shadow-md"
        >
          <Plus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
