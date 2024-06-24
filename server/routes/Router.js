import express from 'express';
import RecipeModel from '../models/Model.js';
import {
  allRecipes,
  getRecipeById,
  getRecipesByIngredients,
  getRecipesByName,
  getRecipesByDiet, // Import the getRecipesByDiet controller
  createRecipe,
  likeRecipe,
} from '../controller/controller.js';

const recipesRouter = express.Router();

recipesRouter.get('/all', allRecipes);
recipesRouter.get('/recipesbyingredients', getRecipesByIngredients);
recipesRouter.get('/recipesbyname', getRecipesByName);
recipesRouter.get('/recipesbydiet', getRecipesByDiet); // Add the endpoint for searching recipes by diet
recipesRouter.get('/:recipeid', getRecipeById);
recipesRouter.post('/', createRecipe);
recipesRouter.post('/:recipeid/like', likeRecipe);

export default recipesRouter;
