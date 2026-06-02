import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import snippetService from "../services/snippetService";
import { useAuth } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import {
  Code2,
  Bookmark,
  Tag,
  FileCode,
  AlignLeft,
  ChevronLeft,
} from "lucide-react";


export default function SnippetForm({isEdit}) {
  const { loading } = useAuth();
  const navigate = useNavigate();
  const [inputData, setInputData] = useState({
    title: "",
    language: "",
    tags: "",
    description: "",
    code:""
  });
  const { id } = useParams();

  const fetchSnippet = async () =>{
    try{
      const response = await snippetService.getSnippetById(id);
      const snippet = response.snippet;

      setInputData({
        title: snippet.title,
        language: snippet.language,
        tags: snippet.tags.join(", "),
        description: snippet.description,
        code: snippet.code
      });
    }
    catch(error){
      console.error('Error fetching snippet:', error);
    }
  }

  useEffect(()=>{
    if(isEdit){
      fetchSnippet();
    }
  },[id,isEdit]);

  const Languages = [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Python",
    "Java",
    "C++",
  ];


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {

    setInputData({
      title: "",
      language: "",
      tags: "",
      description: "",
      code:""
    });
  };

  const handleSubmit = async () => {
    try {
      const snippetData = {
        ...inputData,

        tags: inputData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag !== ""),
      };

      if (
        !inputData.title ||
        !inputData.language ||
        !inputData.code ||
        snippetData.tags.length === 0 ||
        !inputData.description
      ) {
        toast.error("Please fill in all required fields");

        return;
      }

      if(isEdit){
        try{
            const response = await snippetService.updateSnippet(id,{...snippetData});
            console.log(response);
            toast.success(response.message || "Snippet updated successfully");
            setTimeout(() => {
              navigate("/dashboard");
            }, 1000);
        }
        catch(error){
            toast.error(
              error.response?.data?.message || "Failed to create snippet",
            );
        }
      }
      else{
        try {
          const response = await snippetService.createSnippet({
            ...snippetData
          });
          toast.success(
            response.message || "Snippet created successfully"
          );
          navigate("/dashboard");
        } catch (error) {
          toast.error(
            error.response?.data?.message || "Failed to create snippet"
          );
        }
      }
    } 
    catch (error) {
      toast.error(error.response?.data?.message || "Failed to create snippet");
    }
  };

  return (
    <div className="min-h-full bg-base-300 px-3 py-3 md:px-6 overflow-auto">
      <Toaster />

      {/* Outer Container */}
      {/* Changed: removed h-full overflow-hidden so content isn't clipped on mobile */}
      <div className="max-w-6xl mx-auto flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3 flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-4">
            {/* Changed: smaller icon box on mobile */}
            <div className="w-9 h-9 md:w-12 md:h-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center flex-shrink-0">
              <Code2 size={20} className="md:hidden" />
              <Code2 size={24} className="hidden md:block" />
            </div>

            <div>
              {/* Changed: smaller heading on mobile */}
              <h1 className="text-xl md:text-3xl font-bold">
                {isEdit ? "Edit Note" : "Create Note"}
              </h1>

              <p className="text-base-content/60 text-xs md:text-sm mt-0.5 md:mt-1">
                {isEdit
                  ? "Update your snippet details"
                  : "Save and organize your code snippets beautifully"}
              </p>
            </div>
          </div>

          <button className="btn btn-ghost gap-2 hidden md:flex"
            onClick={() => navigate("/dashboard")}>
            <ChevronLeft size={18} />
            Back
          </button>
        </div>

        {/* Main Layout */}
        {/* Changed: single column on mobile/tablet, two columns on lg+; removed h-full overflow-hidden */}
        <div className="grid grid-cols-1 lg:grid-cols-[500px_1fr] gap-4">
          {/* Left Side */}
          {/* Changed: removed max-h-full overflow-hidden — let it grow naturally */}
          <div className="bg-base-100 border border-base-content/10 rounded-3xl shadow-xl p-4 md:p-5 flex flex-col">
            <div className="space-y-4">
              {/* Title */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">
                    Note Title
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-3 h-12 rounded-2xl focus-within:outline-none focus-within:border-primary/30">
                  <FileCode size={18} className="text-base-content/50" />

                  <input
                    type="text"
                    name="title"
                    value={inputData.title}
                    onChange={handleInputChange}
                    className="grow focus:outline-none"
                    placeholder="JWT Authentication Middleware"
                  />
                </label>
              </div>

              {/* Language */}
              <div className="form-control">
                <div className="flex items-center gap-5">
                  <label className="min-w-[90px]">
                    <span className="label-text font-semibold text-base">
                      Language
                    </span>
                  </label>

                  <select
                    className="select select-bordered h-12 rounded-2xl focus:outline-none focus:border-primary/30 w-full"
                    name="language"
                    value={inputData.language}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled>
                      Select language
                    </option>

                    {Languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tags */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">
                    Tags
                  </span>
                </label>

                <label className="input input-bordered flex items-center gap-3 h-12 rounded-2xl focus-within:outline-none focus-within:border-primary/30">
                  <Tag size={18} className="text-base-content/50" />

                  <input
                    type="text"
                    name="tags"
                    value={inputData.tags}
                    onChange={handleInputChange}
                    className="grow focus:outline-none"
                    placeholder="mern, auth, jwt"
                  />
                </label>

                <label className="label">
                  <span className="label-text-alt text-base-content/60">
                    Separate tags with commas
                  </span>
                </label>
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-base">
                    Description
                  </span>
                </label>

                <div className="textarea textarea-bordered rounded-2xl p-0 overflow-hidden w-full focus-within:outline-none focus-within:border-primary/30">
                  <div className="flex gap-3 px-4 pt-4 w-full">
                    <AlignLeft
                      size={18}
                      className="text-base-content/50 mt-1 flex-shrink-0"
                    />

                    <textarea
                      name="description"
                      value={inputData.description}
                      onChange={handleInputChange}
                      className="w-full bg-transparent outline-none resize-none h-20"
                      placeholder="Write a short description about this snippet..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            {/* Changed: mt-6 instead of mt-auto so buttons aren't squished on mobile */}
            <div className="flex gap-3 md:gap-4 mt-6 pt-1">
              <button
                className="btn btn-outline rounded-2xl flex-1"
                onClick={handleClear}
              >
                Clear Note
              </button>

              <button
                className="btn btn-primary rounded-2xl flex-1 gap-2 shadow-lg"
                onClick={handleSubmit}
                disabled={loading}
              >
                <Bookmark size={18} />
                {isEdit ? "Update Note" : "Save Note"}
              </button>
            </div>
          </div>

          {/* Right Side — Code Editor */}
          {/* Changed: fixed height on mobile (h-72), grows on lg+ via lg:min-h-[500px] */}
          <div className="bg-[#0d1117] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-72 sm:h-96 lg:h-auto lg:min-h-[500px]">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-black/20 flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>

                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>

                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>

              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Code2 size={16} />
                snippet.js
              </div>
            </div>

            {/* Editor */}
            <textarea
              name="code"
              value={inputData.code}
              onChange={handleInputChange}
              className="flex-1 w-full bg-transparent text-gray-100 p-4 outline-none resize-none font-mono text-sm leading-7 overflow-auto"
              placeholder="// Write your code here..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
