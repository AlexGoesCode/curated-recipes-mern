import express from 'express';
import RecipeModel from '../models/Model.js';
import {
  allRecipes,
  getRecipeById,
  getRecipesByIngredients,
  getRecipesByName,
  getRecipesByDiet,
  createRecipe,
} from '../controller/controller.js';

const recipesRouter = express.Router();

recipesRouter.get('/all', allRecipes);
recipesRouter.get('/recipesbyname', getRecipesByName); // Endpoint for searching by name
recipesRouter.get('/recipesbyingredients', getRecipesByIngredients); // Endpoint for searching by ingredients
recipesRouter.get('/recipesbydiet', getRecipesByDiet); // Endpoint for searching by diet
recipesRouter.get('/:recipeid', getRecipeById);
recipesRouter.post('/', createRecipe);

export default recipesRouter;
