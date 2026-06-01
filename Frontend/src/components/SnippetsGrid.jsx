import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import snippetService from "../services/snippetService";
import toast, { Toaster } from "react-hot-toast";
import { Search, Code2, Hand, Heart, Funnel } from "lucide-react";
import FilterModal from "./FilterModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

const SnippetsGrid = ({ pinnedSnippets = false }) => {
  const navigate = useNavigate();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [snippetToDelete, setSnippetToDelete] = useState({
    id: "",
    title: "",
  });

  const [filterData, setFilterData] = useState({
    language: "",
    tags: "",
    favouritesOnly: false,
  });

  const handleSearch = async (searchQuery) => {
    try {
      const response = await snippetService.searchSnippets(searchQuery);
      setSnippets(response);
    } catch (error) {
      console.error("Error fetching snippets:", error);
    }
  };
  const getAllSnippets = async () => {
    try {
      setLoading(true);

      const response = await snippetService.getSnippets();

      if (Array.isArray(response)) {
        if (pinnedSnippets) {
          const pinnedSnippets = response.filter((snippet) => snippet.isPinned);
          setSnippets(pinnedSnippets);
        } else {
          const sortedSnippets = [...response].sort((a, b) => {
            return b.isPinned - a.isPinned;
          }); // Create a copy of the array to avoid modifying the original response by spreading it
          setSnippets(sortedSnippets);
        }
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching snippets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (query.trim() !== "") {
        console.log("Search query:", query);
        handleSearch(query);
      } else {
        getAllSnippets();
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [query, pinnedSnippets]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handlePin = async (id) => {
    try {
      const response = await snippetService.pinSnippet(id);

      setSnippets((prev) => {
        const updatedSnippets = prev.map((snippet) =>
          snippet._id === id
            ? { ...snippet, isPinned: !snippet.isPinned }
            : snippet,
        );

        // Favorites page
        if (pinnedSnippets) {
          return updatedSnippets.filter((snippet) => snippet.isPinned);
        }

        // Dashboard page
        return updatedSnippets.sort((a, b) => b.isPinned - a.isPinned);
      });

      if (response?.pinned) {
        toast.success(response?.message || "Snippet pinned successfully");
      } else {
        toast.success(response?.message || "Snippet unpinned successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to pin snippet");
    }
  };

  const handleFilter = () => {
    setIsModalOpen(true);
  };

  const handleDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="w-full">
      <Toaster />

      {/* Header */}
      <div className="flex flex-col gap-5 mb-8 md:flex-row md:items-center md:justify-between">
        {/* Left Section */}
        <div>
          <h2 className="text-3xl font-bold">Your Notes</h2>

          <p className="text-base-content/60 mt-1">
            Manage and organize your notes
          </p>
        </div>

        {/* Right Section */}
        <div className=" flex items-center gap-3 w-full md:w-auto">
          {/* Search */}
          <label className="input input-bordered rounded-2xl flex items-center gap-3 flex-1 md:w-[420px] focus-within:outline-none focus-within:border-primary/30">
            <Search size={18} className="text-base-content/60" />

            <input
              type="text"
              className="grow"
              name="query"
              value={query}
              onChange={handleChange}
              placeholder="Search notes..."
            />
          </label>

          {/* Filter Button */}
          <div className="relative">
            <button
              className="w-10 h-10 md:w-12 md:h-12 border border-primary/80 hover:border-primary transition-all rounded-2xl flex items-center justify-center shrink-0"
              onClick={handleFilter}
            >
              <Funnel size={20} />
            </button>

            <FilterModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              pinnedSnippets={pinnedSnippets}
              filterData={filterData}
              setFilterData={setFilterData}
              snippets={snippets}
              setSnippets={setSnippets}
            />
          </div>
        </div>
      </div>

      {/* Empty State */}
      {snippets.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-24">
          <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-6">
            <Code2 size={40} className="text-primary" />
          </div>

          <h3 className="text-2xl font-bold">
            {pinnedSnippets ? "No Favourited Snippets" : "No Snippets"}
          </h3>

          <p className="text-base-content/60 mt-2 max-w-md">
            {pinnedSnippets
              ? "Start favouriting your important snippets."
              : "Start building your personal developer notebook by creating your first snippet."}
          </p>

          <button
            onClick={
              pinnedSnippets
                ? () => navigate("/dashboard")
                : () => navigate("/create")
            }
            className="btn btn-primary rounded-2xl mt-6"
          >
            {pinnedSnippets ? "Favourite Snippets" : "Create First Note"}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <div
              key={snippet._id}
              className="
                card bg-base-100
                shadow-lg border border-base-content/10
                hover:-translate-y-1 hover:shadow-2xl
                transition-all duration-300
              "
            >
              <div className="card-body">
                {/* Top */}
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="card-title text-lg">{snippet.title}</h3>

                    <p className="text-sm text-base-content/60 mt-1">
                      {snippet.language}
                    </p>
                  </div>

                  <div className="w-15 h-11 rounded-2xl flex items-center justify-between pb-3">
                    <button
                      onClick={() => handlePin(snippet._id)}
                      className="cursor-pointer"
                    >
                      <Heart
                        size={20}
                        strokeWidth={1.5}
                        className={`transition-colors ${
                          snippet.isPinned
                            ? "fill-red-500 text-red-500"
                            : "text-gray-400 hover:text-red-500 hover:fill-red-500"
                        }
                               `}
                      />
                    </button>
                    <Code2
                      className="text-primary bg-primary/10 rounded-2xl"
                      size={20}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-base-content/70 mt-2 line-clamp-3">
                  {snippet.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {snippet.tags?.map((tag, index) => (
                    <div
                      key={index}
                      className="badge badge-primary badge-outline"
                    >
                      {tag}
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="card-actions justify-end mt-2 items-center">
                  <button
                    onClick={() => navigate(`/snippet/${snippet._id}`)}
                    className="btn btn-sm btn-outline rounded-xl"
                  >
                    View
                  </button>

                  <button
                    onClick={() => {
                      setSnippetToDelete({
                        id: snippet._id,
                        title: snippet.title,
                      });
                      handleDeleteModal();
                    }}
                    className="btn btn-sm btn-outline text-red-500 rounded-xl"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <ConfirmDeleteModal
            isDeleteModalOpen={isDeleteModalOpen}
            setIsDeleteModalOpen={setIsDeleteModalOpen}
            snippetId={snippetToDelete.id}
            snippetTitle={snippetToDelete.title}
            snippets={snippets}
            setSnippets={setSnippets}
          />
        </div>
      )}
    </div>
  );
};

export default SnippetsGrid;
