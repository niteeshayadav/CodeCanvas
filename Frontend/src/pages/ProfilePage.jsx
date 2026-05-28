import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import snippetService from "../services/snippetService";

const ProfilePage = () => {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [snippets, setSnippets] = useState([]);

  const getSnippets = async () => {
    try {
      const response = await snippetService.getSnippets();
      setSnippets(response);
    } catch (error) {
      console.error("Error fetching snippets:", error);
    }
  };

  useEffect(() => {
    getSnippets();
  }, []);

  const favourites = snippets.filter((snippet) => snippet.isPinned);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-base-300 font-['Inter']">
      <div className="w-full max-w-sm rounded-2xl p-6 bg-[#0d1117]">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-mono text-[13px] text-[#58a6ff]">
            &lt;
            <span className="text-[#bc8cff]">/</span>
            &gt; code canvas
          </span>

          <div className="flex gap-4">{/* nav icons */}</div>
        </div>

        {/* Avatar + Info */}
        <div className="flex items-start gap-5 mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl flex-shrink-0 bg-[#161b22] border border-[#30363d] text-[#58a6ff] font-mono">
            {user?.fullname?.charAt(0).toUpperCase()}
          </div>

          <div className="pt-1">
            <p className="text-lg font-medium text-[#e6edf3]">
              {user?.fullname}
            </p>

            <p className="font-mono text-xs text-[#58a6ff] mt-1">
              @{user?.username}
            </p>

            <p className="font-mono text-[11.5px] text-[#8b949e] mt-2">
              {user?.email}
            </p>
          </div>
        </div>

        <hr className="border-t border-[#21262d] my-5" />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {/* Snippets */}
          <div className="text-center rounded-lg p-3 bg-[#161b22] border border-[#21262d]">
            <span className="block text-lg font-medium font-mono text-[#e6edf3]">
              {snippets?.length ?? 0}
            </span>

            <span className="text-xs text-[#8b949e]">snippets</span>
          </div>

          {/* Favourites */}
          <div className="text-center rounded-lg p-3 bg-[#161b22] border border-[#21262d]">
            <span className="block text-lg font-medium font-mono text-[#e3b341]">
              {favourites?.length ?? 0}
            </span>

            <span className="text-xs text-[#8b949e]">favourites</span>
          </div>
        </div>

        {/* Recent Snippets */}
        <p className="font-mono text-[11px] text-[#8b949e] tracking-wider uppercase mb-3">
          recent snippets
        </p>

        {/* Empty State */}
        {snippets?.length === 0 && (
          <div className="flex flex-col gap-3">
            <p className="font-mono text-[11px] text-[#8b949e] tracking-wider uppercase">
              No snippets found
            </p>

            <button
              className="btn btn-primary"
              onClick={() => navigate("/create")}
            >
              Create Snippet
            </button>
          </div>
        )}

        {/* Snippets List */}
        {snippets?.slice(0, 3).map((snippet) => (
          <div
            key={snippet._id}
            className="flex items-center justify-between rounded-lg px-3 py-2.5 mb-2 bg-[#161b22] border border-[#21262d]"
          >
            <div className="flex items-center gap-3">
              <div>
                <p className="font-mono text-xs text-[#e6edf3]">
                  {snippet.title}
                </p>

                <p className="text-[11px] text-[#8b949e] mt-1">
                  {snippet.description}
                </p>
              </div>
            </div>

            <span className="font-mono text-[10px] px-2 py-[2px] rounded-full bg-[#58a6ff18] text-[#58a6ff] border border-[#58a6ff30]">
              {snippet.language}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;
