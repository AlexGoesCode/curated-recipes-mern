import express from 'express';
import { getUserLikes } from '../controllers/likesController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/likes', authMiddleware, getUserLikes);

export default router;
