import express from 'express';
import {
  allRecipes,
  getRecipeById,
  getRecipesByIngredients,
  getRecipesByName,
  getRecipesByDiet,
  createRecipe,
  likeRecipe,
} from '../controllers/recipesController.js';
import authMiddleware from '../middleware/auth.js';

const recipesRouter = express.Router();

recipesRouter.get('/all', allRecipes);
recipesRouter.get('/recipesbyingredients', getRecipesByIngredients);
recipesRouter.get('/recipesbyname', getRecipesByName);
recipesRouter.get('/recipesbydiet', getRecipesByDiet);
recipesRouter.get('/:recipeid', getRecipeById);
recipesRouter.post('/', createRecipe);
recipesRouter.post('/:recipeid/like', authMiddleware, likeRecipe);

export default recipesRouter;
