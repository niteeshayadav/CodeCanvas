import React from "react";
import { Trash2, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import snippetService from "../services/snippetService";

export default function DeleteConfirmModal({
  isDeleteModalOpen,
  setIsDeleteModalOpen,
  snippetId,
  snippetTitle,
  setSnippets,
}) {
  if (!isDeleteModalOpen) return null;

  const handleDelete = async () => {
    try {
      const response = await snippetService.deleteSnippet(snippetId);

      console.log(response);

      toast.success(response?.message || "Snippet deleted successfully");

      setSnippets((prev) =>
        prev.filter((snippet) => snippet._id !== snippetId),
      );

      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete snippet");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <Toaster />

      <div className="w-full max-w-md rounded-2xl bg-base-100 shadow-2xl border border-base-content/10 p-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-red-500/10">
              <Trash2 className="text-red-500" size={22} />
            </div>

            <div>
              <h2 className="text-xl font-bold">Delete Snippet</h2>

              <p className="text-sm text-base-content/60">
                This action cannot be undone
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-base text-base-content/80 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-error">"{snippetTitle}"</span>?
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => setIsDeleteModalOpen(false)}
            className="btn btn-outline rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="btn btn-error rounded-xl text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
