import Editor from "@monaco-editor/react";
import { Copy, Pencil, Trash2, Tag, Check } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import snippetService from "../services/snippetService";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

export default function SnippetDetails() {
  const { id } = useParams();
  const [snippet, setSnippet] = useState(null);
  const { loading } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const fetchSnippet = async () => {
    try {
      const response = await snippetService.getSnippetById(id);
      setSnippet(response.snippet);
    } catch (error) {
      console.error("Error fetching snippet:", error);
    }
  };

  useEffect(() => {
    fetchSnippet();
  }, [id]);

  const copyCode = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleDelete = async () => {
    try {
      const response = await snippetService.deleteSnippet(id);
      toast.success(response?.data?.message || "Snippet deleted successfully");
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete snippet");
    }
  };

  if (!snippet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-base-300 p-4 md:p-8">
      <Toaster />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          {/* Left Section */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold leading-tight">
              {snippet.title}
            </h1>

            {/* Language Badge */}
            <div className="mt-2">
              <div className="badge badge-secondary badge-md uppercase font-semibold">
                {snippet.language}
              </div>
            </div>

            {/* Description */}
            <p className="text-base-content/60 mt-2 text-lg">
              {snippet.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-2">
              {snippet.tags?.map((tag, index) => (
                <div
                  key={index}
                  className="badge badge-primary gap-1 px-3 py-3"
                >
                  <Tag size={14} />
                  {tag}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Link to={`/edit/${snippet._id}`}>
              <button
                className="btn btn-warning btn-sm md:btn-md"
                disabled={loading}
              >
                <Pencil size={18} />
                Edit
              </button>
            </Link>

            <button
              className="btn btn-error btn-sm md:btn-md"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 size={18} />
              Delete
            </button>
          </div>
        </div>

        {/* Editor Container */}
        <div className="rounded-2xl overflow-hidden border border-base-content/10 shadow-2xl bg-[#1e1e1e]">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-2 md:px-5 py-3 border-b border-white/10 bg-[#252526]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>

            <button
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              onClick={copyCode}
              disabled={loading}
            >
              {copied ? (
                <Check size={20} className="text-green-400" />
              ) : (
                <Copy size={20} className="text-gray-300" />
              )}
            </button>
          </div>

          {/* Monaco Editor */}
          <Editor
            height="75vh"
            language={snippet.language}
            value={snippet.code}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 15,
              fontFamily: "monospace",
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              padding: {
                top: 20,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
