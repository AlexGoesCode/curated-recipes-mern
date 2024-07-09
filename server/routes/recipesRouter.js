import express from 'express';
import {
  //* Import all the functions from the recipesController
  allRecipes,
  getRecipeById,
  getRecipesByIngredients,
  getRecipesByName,
  getRecipesByDiet,
  createRecipe,
  likeRecipe,
  getUserLikes,
  unlikeRecipe,
} from '../controllers/recipesController.js';
import authMiddleware from '../middleware/auth.js';
import { multerUpload } from '../middleware/multer.js';

const recipesRouter = express.Router();

//* Define the routes for the recipes APIxz
recipesRouter.get('/all', allRecipes);
recipesRouter.get('/recipesbyingredients', getRecipesByIngredients);
recipesRouter.get('/recipesbyname', getRecipesByName);
recipesRouter.get('/recipesbydiet', getRecipesByDiet);
recipesRouter.get('/:recipeid', getRecipeById);
recipesRouter.get('/userlikes', getUserLikes);
recipesRouter.post('/new-recipe', multerUpload.single('picture'), createRecipe);
recipesRouter.post('/:recipeid/like', likeRecipe);
recipesRouter.delete('/:recipeid/unlike', unlikeRecipe);
// recipesRouter.put('/:recipeid/rating', authMiddleware, rating);

export default recipesRouter;
