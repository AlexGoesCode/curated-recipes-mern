import RecipeModel from '../models/Model.js';

const allRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});
    res.status(200).json({ recipes, totalPages: 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
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

const getRecipesByIngredients = async (req, res) => {
  try {
    const { ingredients } = req.query;
    const recipes = await RecipeModel.find({
      ingredients: { $elemMatch: { $in: ingredients.split(',') } },
    });
    res.status(200).json({ recipes, totalPages: 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipesByName = async (req, res) => {
  try {
    const { name } = req.query;
    const recipes = await RecipeModel.find({ name: new RegExp(name, 'i') });
    res.status(200).json({ recipes, totalPages: 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipesByDiet = async (req, res) => {
  try {
    const { diet } = req.query;
    const recipes = await RecipeModel.find({ diet: new RegExp(diet, 'i') });
    res.status(200).json({ recipes, totalPages: 1 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { recipeid } = req.params;
    const recipe = await RecipeModel.findById(recipeid);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.status(200).json({ data: recipe, error: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const likeRecipe = async (req, res) => {
  try {
    const { recipeid } = req.params;
    const recipe = await RecipeModel.findById(recipeid);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    recipe.likes = (recipe.likes || 0) + 1;
    await recipe.save();
    res.status(200).json({ data: recipe, error: false });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  allRecipes,
  createRecipe,
  getRecipesByIngredients,
  getRecipesByName,
  getRecipesByDiet,
  getRecipeById,
  likeRecipe,
};
