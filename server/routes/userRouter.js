import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getUserLikes } from '../controllers/recipesController.js';

import { registerUser, loginUser } from '../controllers/userController.js';

const router = express.Router();

// router.get('/likes', authMiddleware, getUserLikes);
router.get('/likes', authMiddleware, getUserLikes);
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
