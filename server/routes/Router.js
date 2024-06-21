import express, { response } from 'express';
import RecipeModel from '../models/Model.js'; //! .js
import {
  allRecipes,
  getRecipeById,
  getRecipesByIngredients,
  recipesByIngredient,
  createRecipe,
} from '../controller/controller.js'; //! .js

const recipesRouter = express.Router(); // creates a new router object

recipesRouter.get('/all', allRecipes); // endpoint and controller
recipesRouter.get('/recipesbyingredients', getRecipesByIngredients); // endpoint and controller
recipesRouter.get('/:recipeid', getRecipeById); // endpoint and controller
recipesRouter.get('/:ingredients', recipesByIngredient); // endpoint and controller
recipesRouter.post('/', createRecipe);

recipesRouter.post('/', async (req, res) => {
  try {
    console.log('Received data:', req.body);
    const newRecipe = new RecipeModel(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    console.error('Error saving recipe:', error.message); // Add this line to log errors
    res.status(400).json({ error: error.message });
  }
});

export default recipesRouter;
