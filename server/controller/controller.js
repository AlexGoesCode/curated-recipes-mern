import RecipeModel from '../models/Model.js';

export const allRecipes = async (req, res) => {
  try {
    const allRecipes = await RecipeModel.find({});
    res.status(200).json({ number: allRecipes.length, allRecipes });
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createRecipe = async (req, res) => {
  try {
    const newRecipe = new RecipeModel(req.body);
    const savedRecipe = await newRecipe.save();
    res.status(201).json(savedRecipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRecipesByName = async (req, res) => {
  try {
    const { name, page = 1, limit = 10 } = req.query;
    const recipes = await RecipeModel.find({
      name: { $regex: name, $options: 'i' },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await RecipeModel.countDocuments({
      name: { $regex: name, $options: 'i' },
    });

    res.json({
      recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipesByDiet = async (req, res) => {
  try {
    const { diet, page = 1, limit = 10 } = req.query;
    const recipes = await RecipeModel.find({ diet })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await RecipeModel.countDocuments({ diet });

    res.json({
      recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipesByIngredients = async (req, res) => {
  try {
    const { ingredients, page = 1, limit = 10 } = req.query;
    const ingredientList = ingredients
      .split(',')
      .map((ingredient) => ingredient.trim());
    const recipes = await RecipeModel.find({
      ingredients: { $all: ingredientList },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const count = await RecipeModel.countDocuments({
      ingredients: { $all: ingredientList },
    });

    res.json({
      recipes,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRecipeById = async (req, res) => {
  console.log('get recipes by id working');
  try {
    const recipeId = req.params.recipeid;
    console.log('recipeId>>>>', recipeId);
    const recipe = await RecipeModel.findById(recipeId);
    if (!recipe) {
      res.status(200).json({
        message: 'no recipes with this id',
        data: null,
        error: false,
      });
      return;
    }
    res.status(200).json({
      message: 'this are the recipes found',
      data: recipe,
      error: false,
    });
  } catch (error) {
    console.log('error', error);
    res.status(500).json({
      message: 'something went wrong',
      data: null,
      error: true,
    });
  }
};
