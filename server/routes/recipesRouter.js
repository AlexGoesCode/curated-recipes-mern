import express from 'express';
import {
  allRecipes,
  getRecipeById,
  getRecipesByIngredients,
  getRecipesByName,
  getRecipesByDiet,
  createRecipe,
  likeRecipe,
  getUserLikes,
} from '../controllers/recipesController.js';
import authMiddleware from '../middleware/auth.js';

const recipesRouter = express.Router();

recipesRouter.get('/all', allRecipes);
recipesRouter.get('/recipesbyingredients', getRecipesByIngredients);
recipesRouter.get('/recipesbyname', getRecipesByName);
recipesRouter.get('/recipesbydiet', getRecipesByDiet);
recipesRouter.get('/:recipeid', getRecipeById);
recipesRouter.post('/', createRecipe);
// recipesRouter.post('/:recipeid/like', authMiddleware, likeRecipe); //commented out until login feature with token generation is ready
recipesRouter.post('/:recipeid/like', likeRecipe);
recipesRouter.get('/userlikes', getUserLikes);

export default recipesRouter;