import RecipeModel from '../models/recipe';
import Like from '../models/Like.js';

const allRecipes = async (req, res) => {
  try {
    const allRecipes = await RecipeModel.find({});
    res.status(200).json({ number: allRecipes.length, allRecipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const createRecipe = async (req, res) => {
  try {
    const newRecipe = new RecipeModel(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRecipesByName = async (req, res) => {
  try {
    const name = req.query.name;
    const recipes = await RecipeModel.find({
      name: { $regex: name, $options: 'i' },
    });
    if (recipes.length) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ message: 'No recipes found with that name' });
    }
  } catch (error) {
    console.error('Error fetching recipes by name:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRecipesByIngredients = async (req, res) => {
  const ingredient = req.query.ingredients;
  try {
    const recipesArray = await RecipeModel.find({
      ingredients: { $elemMatch: { $in: ingredient } },
    });
    res.status(200).json(recipesArray);
  } catch (error) {
    console.log('Error fetching recipes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRecipesByDiet = async (req, res) => {
  const diet = req.query.diet;
  try {
    const recipesArray = await RecipeModel.find({ diet });
    res.status(200).json(recipesArray);
  } catch (error) {
    console.log('Error fetching recipes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.recipeid;
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      res.status(404).json({
        message: 'No recipes with this ID',
        data: null,
        error: false,
      });
      return;
    }
    res.status(200).json({
      message: 'Recipe found',
      data: recipe,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Something went wrong',
      data: null,
      error: true,
    });
  }
};

const likeRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    // Check if the user has already liked the recipe
    const existingLike = await Like.findOne({ userId, recipeId });
    if (existingLike) {
      return res
        .status(400)
        .json({ message: 'You have already liked this recipe' });
    }

    // Create a new like
    const like = new Like({ userId, recipeId });
    await like.save();

    // Increment the recipe's like count
    await Recipe.findByIdAndUpdate(recipeId, { $inc: { likes: 1 } });

    res.status(200).json({ message: 'Recipe liked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export {
  allRecipes,
  createRecipe,
  getRecipesByName,
  getRecipesByIngredients,
  getRecipesByDiet,
  getRecipeById,
  likeRecipe,
};
