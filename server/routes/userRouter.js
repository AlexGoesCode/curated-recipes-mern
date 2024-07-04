import express from 'express';
import authMiddleware from '../middleware/auth.js';
import { getUserLikes } from '../controllers/recipesController.js';
import {
  registerUser,
  loginUser,
  testAuth,
  uploadAvatar,
  getUserProfile,
} from '../controllers/userController.js';
import { multerUpload } from '../middleware/multer.js';

const router = express.Router();

//! keep requests grouped per request type
// router.get('/likes', authMiddleware, getUserLikes);
router.get('/likes', authMiddleware, getUserLikes);
router.post('/register', multerUpload.single('avatar'), registerUser);
router.post('/login', loginUser);
router.get('/testAuth', authMiddleware, testAuth);
router.post(
  '/upload-avatar',
  authMiddleware,
  multerUpload.single('avatar'),
  uploadAvatar
);
router.get('/profile', authMiddleware, getUserProfile);

export default router;
