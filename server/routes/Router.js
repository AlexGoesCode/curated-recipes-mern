import express, { response } from 'express';
import RecipeModel from '../models/Model.js'; //! .js
import { allMeals } from '../controller/controller.js';

const recipesRouter = express.Router(); // creates a new router object

recipesRouter.get('/all', allMeals); // endpoint and controller

export default recipesRouter;
