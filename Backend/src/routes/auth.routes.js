import express from 'express';
import authController from '../controllers/auth.controller.js';
import authenticatedUser from '../middlewares/auth.middleware.js';
import rateLimit from 'express-rate-limit';

const authRouter = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // max 10 requests per IP
  message: { message: "Too many attempts, please try again after 15 minutes" },
});


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter.post('/register', authLimiter, authController.registerUser);
/**
 * @route POST /api/auth/login
 * @desc Login a user and return a token in the cookies
 * @access Public
 */
authRouter.post('/login', authLimiter, authController.loginUser);

/**
 * @route POST /api/auth/logout
 * @desc Logout a user by clearing the token from cookies and Blacklisting the token
 * @access Public
 */
authRouter.post('/logout', authLimiter, authController.logoutUser);

/**
 * @route GET /api/auth/me
 * @desc Get the logged in user's details, expects token in the cookies
 * @access Private
 */
authRouter.get('/me', authenticatedUser, authController.getMe);

export default authRouter;