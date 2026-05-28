import React from "react";
import { Search } from "lucide-react";
const SearchBar = () => {
  return (
    <div className="hidden md:flex flex-1 justify-center px-4 lg:px-8">
      <label className="input input-bordered rounded-2xl flex items-center gap-3 w-full max-w-xl focus-within:outline-none focus-within:border-primary/30">
        <Search size={18} className="text-base-content/60" />

        <input type="text" className="grow" placeholder="Search notes..." />
      </label>
    </div>
  );
};

export default SearchBar;
