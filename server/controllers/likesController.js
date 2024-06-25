// server/controllers/userController.ts
import { Request, Response } from 'express';
import Like from '../models/Like';

export const getUserLikes = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming the auth middleware sets req.user

    const likes = await Like.find({ userId }).populate('recipeId');
    const likedRecipeIds = likes.map((like) => like.recipeId._id);

    res.status(200).json({ likes: likedRecipeIds });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
