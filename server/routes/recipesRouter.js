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
  unlikeRecipe,
} from '../controllers/recipesController.js';
import authMiddleware from '../middleware/auth.js';
import { multerUpload } from '../middleware/multer.js';

const recipesRouter = express.Router();

recipesRouter.get('/all', allRecipes);
recipesRouter.get('/recipesbyingredients', getRecipesByIngredients);
recipesRouter.get('/recipesbyname', getRecipesByName);
recipesRouter.get('/recipesbydiet', getRecipesByDiet);
recipesRouter.get('/:recipeid', getRecipeById);
recipesRouter.post('/new-recipe', multerUpload.single('picture'), createRecipe); // this route should contain an endpoint that handles the file and sends it to the controller e.g.: router("/", multer.upload("image")). Information available in the image upload spike. (in the middle)
// recipesRouter.post('/:recipeid/like', authMiddleware, likeRecipe); //commented out until login feature with token generation is ready
recipesRouter.post('/:recipeid/like', likeRecipe);
recipesRouter.delete('/:recipeid/unlike', unlikeRecipe);
recipesRouter.get('/userlikes', getUserLikes);

export default recipesRouter;
