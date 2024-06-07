import express, { response } from 'express';
import RecipeModel from '../models/Model.js'; //! .js
import { allRecipes, recipesByIngredient } from '../controller/controller.js'; //! .js

const recipesRouter = express.Router(); // creates a new router object

recipesRouter.get('/all', allRecipes); // endpoint and controller
recipesRouter.get('/:ingredients', recipesByIngredient); // endpoint and controller

export default recipesRouter;
