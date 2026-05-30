import express from 'express';
import snippetController from '../controllers/snippet.controller.js';
import authenticatedUser from '../middlewares/auth.middleware.js';

const snippetRouter = express.Router();

/**
 * @route POST /api/snippets
 * @desc Create a new snippet
 * @access Private
 */
snippetRouter.post('/', authenticatedUser, snippetController.createSnippet);

/**
 * @route GET /api/snippets/search
 * @desc Search snippets by title or content
 * @access Private
 */
snippetRouter.get('/search', authenticatedUser, snippetController.searchSnippets);

/**
 * @route GET /api/snippets
 * @desc Get all snippets
 * @access Private
 */
snippetRouter.get('/', authenticatedUser, snippetController.getAllSnippets);

/**
 * @route GET /api/snippets/:id
 * @desc Get a snippet by ID
 * @access Private
 */
snippetRouter.get('/:id', authenticatedUser, snippetController.getSnippetById);

/**
 * @route PATCH /api/snippets/:id
 * @desc Update a snippet by ID
 * @access Private
 */
snippetRouter.patch('/:id', authenticatedUser, snippetController.updateSnippet);

/**
 * @route DELETE /api/snippets/:id
 * @desc Delete a snippet by ID
 * @access Private
 */
snippetRouter.delete('/:id', authenticatedUser, snippetController.deleteSnippet);


/**
 * @name pinSnippet
 * @desc Pin a snippet by ID for the authenticated user
 * @access Private
 */
snippetRouter.patch('/:id/pin', authenticatedUser, snippetController.pinSnippet);

export default snippetRouter;