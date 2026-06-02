import React from "react";
import { X, Tag } from "lucide-react";
import snippetService from "../services/snippetService";

export default function FilterModal({
  isModalOpen,
  setIsModalOpen,
  filterData,
  setFilterData,
  setSnippets,
}) {
  const Languages = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
  ];

  if (!isModalOpen) {
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const handleFavouritesOnly = () => {
    setFilterData({
      ...filterData,
      favouritesOnly: !filterData.favouritesOnly,
    });
  };

  const handleClear = async () => {
    setFilterData({
      language: "",
      tags: "",
      favouritesOnly: false,
    });

    try {
      const response = await snippetService.getSnippets();
      const sortedSnippets = [...response].sort((a, b) => {
        return b.isPinned - a.isPinned;
      });
      setSnippets(sortedSnippets);

      setIsModalOpen(false);
    } catch (error) {
      console.error(error?.response?.data?.message || "Get Snippets error");
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();

    try {
      const filter = {
        ...filterData,

        tags: filterData.tags
          ? filterData.tags
              .split(",")
              .map((tag) => tag.trim())
              .filter((tag) => tag !== "")
              .join(",")
          : "",
      };

      const response = await snippetService.getSnippets(filter);

      setSnippets(response);

      setIsModalOpen(false);
    } catch (error) {
      console.error(error?.response?.data?.message || "Get Snippets error");
    }
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-40"
        onClick={() => setIsModalOpen(false)}
      />

      {/* Modal */}
      <div className="absolute top-14 right-2 sm:right-0 z-50">
        <form
          onSubmit={handleApply}
          className="bg-base-200 border border-base-300 w-[92vw] max-w-80 p-5 sm:p-6 rounded-3xl shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-base-content">
              Filters
            </h3>

            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost"
              onClick={() => setIsModalOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          {/* Language */}
          <div className="form-control mb-5">
            <label className="label pb-2">
              <span className="label-text text-sm font-medium text-base-content/70">
                Language
              </span>
            </label>

            <select
              className="select select-bordered h-11 sm:h-12 rounded-2xl w-full focus:outline-none focus:border-primary/40"
              name="language"
              value={filterData.language}
              onChange={handleInputChange}
            >
              <option value="">All Languages</option>

              {Languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="form-control mb-5">
            <label className="label pb-2">
              <span className="label-text text-sm font-medium text-base-content/70">
                Tags
              </span>
            </label>

            <label className="input input-bordered flex items-center gap-3 h-11 sm:h-12 rounded-2xl focus-within:border-primary/40">
              <Tag size={17} className="text-base-content/50 shrink-0" />

              <input
                type="text"
                name="tags"
                value={filterData.tags}
                onChange={handleInputChange}
                className="grow bg-transparent focus:outline-none min-w-0"
                placeholder="mern, auth, jwt"
              />
            </label>

            <label className="label pt-2">
              <span className="label-text-alt text-base-content/50 text-xs sm:text-sm">
                Separate tags with commas
              </span>
            </label>
          </div>

          {/* Favourites */}
          <div className="form-control mb-7">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                name="favouritesOnly"
                className="checkbox checkbox-sm checkbox-primary"
                checked={filterData.favouritesOnly}
                onChange={handleFavouritesOnly}
              />

              <span className="label-text text-sm sm:text-base text-base-content">
                Favourites only
              </span>
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-2 sm:gap-3">
            <button
              type="button"
              className="btn btn-sm btn-ghost border border-base-300 px-4 sm:px-5"
              onClick={handleClear}
            >
              Clear
            </button>

            <button
              type="submit"
              className="btn btn-sm btn-primary px-4 sm:px-5 rounded-xl"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
