import Snippet from "../models/snippet.model.js";

/**
 * @name createSnippet
 * @desc Create a new snippet, expects title, language, description, code and tags in the request body
 * @access Private
 */
const createSnippet = async (req, res) => {
  const { title, language, code, description, tags } = req.body;
  if (!title || !language || !code || !description || !tags) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newSnippet = await Snippet.create({
      title,
      language,
      description,
      code,
      tags,
      user: req.user.id,
    });
    res.status(201).json({
      message: "Snippet created successfully",
      newSnippet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @name getAllSnippets
 * @desc Get all snippets for the authenticated user
 * @access Private
 */
const getAllSnippets = async (req, res) => {
  try {
    const filter = {
      user: req.user.id,
    };
    
    // Language filter
    if (req.query.language) {
      filter.language = {
        $regex: req.query.language,
        $options: "i",
      };
    }

    // Tags filter
    if (req.query.tags) {
      const tagsArray = req.query.tags.split(",");
      filter.tags = {
        $in: tagsArray.map((tag) => new RegExp(tag, "i")),
      };
    }

    // Favouries Only filter
    if (req.query.favouritesOnly === "true") {
      filter.isPinned = true;
    }
    const snippets = await Snippet.find(filter).sort({ createdAt: -1 }); //{ createdAt: -1 } means Sort by createdAt in descending order
    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @name getSnippetById
 * @desc Get a snippet by ID for the authenticated user
 * @access Private
 */
const getSnippetById = async (req, res) => {
  const { id } = req.params;
  try {
    const snippet = await Snippet.findOne({ _id: id, user: req.user.id });
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    res.status(200).json({
      message: "Snippet found",
      snippet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @name updateSnippet
 * @desc Update a snippet by ID for the authenticated user
 * @access Private
 */
const updateSnippet = async (req, res) => {
  const { id } = req.params;
  const { title, language, description, code, tags } = req.body;
  try {
    const snippet = await Snippet.findOne({ _id: id, user: req.user.id });
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    snippet.title = title ?? snippet.title; // Use nullish coalescing operator to allow empty string values
    snippet.language = language ?? snippet.language;
    snippet.description = description ?? snippet.description;
    snippet.code = code ?? snippet.code;
    snippet.tags = tags ?? snippet.tags;
    await snippet.save();
    res.status(200).json({
      message: "Snippet updated successfully",
      snippet,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

/**
 * @name deleteSnippet
 * @desc Delete a snippet by ID for the authenticated user
 * @access Private
 */
const deleteSnippet = async (req, res) => {
  const { id } = req.params;
  try {
    const snippet = await Snippet.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    res.status(200).json({ message: "Snippet deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
/**
 * @name searchSnippets
 * @desc Search snippets by title or content for the authenticated user, expects a query parameter 'q' in the request
 * @access Private
 */
const searchSnippets = async (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ message: "Query parameter q is required" });
  }
  try {
    const snippets = await Snippet.find({
      user: req.user.id,
      $or: [
        { title: { $regex: q, $options: "i" } },
        { language: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } },
        { code: { $regex: q, $options: "i" } },
      ],
    });
    res.status(200).json(snippets);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
const pinSnippet = async (req, res) => {
  const { id } = req.params;
  try {
    const snippet = await Snippet.findOne({ _id: id, user: req.user.id });
    if (!snippet) {
      return res.status(404).json({ message: "Snippet not found" });
    }
    snippet.isPinned = !snippet.isPinned;
    await snippet.save();
    if (snippet.isPinned) {
      res.status(200).json({
        message: "Snippet pinned successfully",
        pinned: true,
      });
    } else {
      res.status(200).json({
        message: "Snippet unpinned successfully",
        pinned: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const snippetController = {
  createSnippet,
  getAllSnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  searchSnippets,
  pinSnippet,
};

export default snippetController;
