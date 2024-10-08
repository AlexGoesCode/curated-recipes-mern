import RecipeModel from '../models/Recipe.js';
import Like from '../models/Like.js';
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import { imageUpload } from '../utils/imageUpload.js';

//* Function that tries to fetch all recipes from the model. -> 200 or 500
const allRecipes = async (req, res) => {
  try {
    const allRecipes = await RecipeModel.find({});

    res.status(200).json({ number: allRecipes.length, allRecipes });
    console.log('recipiesResponse :>> ', recipiesResponse);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//* Function that tries to create a new recipe from the request body. -> 201 or 400
const createRecipe = async (req, res) => {
  console.log('req.body :>> ', req.body);

  const arrayOfIngredients = req.body.ingredients.split(',');
  const arrayOfDiets = req.body.diet.split(','); // Split the diet field into an array
  console.log('arrayOfDiets :>> ', arrayOfDiets);

  if (req.file) {
    const uploadedFile = await imageUpload(req.file, 'recipe-images');
    try {
      const newRecipe = new RecipeModel({
        name: req.body.name,
        origin: req.body.origin,
        ingredients: arrayOfIngredients,
        instructions: req.body.instructions,
        picture: uploadedFile,
        difficulty: req.body.difficulty,
        diet: arrayOfDiets, // Store as an array
      });

      const savedRecipe = await newRecipe.save();
      return res.status(201).json(savedRecipe);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

//* Function that tries to fetch recipes by name from the model. -> 200, 404 or 500
const getRecipesByName = async (req, res) => {
  const name = req.query.name;
  const page = parseInt(req.query.page) || 1; // Get the current page, default is 1
  const limit = parseInt(req.query.number) || 10; // Get the items per page, default is 10
  const skip = (page - 1) * limit; // Calculate how many items to skip

  //* Fetch the name from the query
  try {
    const recipes = await RecipeModel.find({
      name: { $regex: name, $options: 'i' },
    })
      .skip(skip)
      .limit(limit); // Pagination logic here

    const totalCount = await RecipeModel.countDocuments({
      name: { $regex: name, $options: 'i' },
    }); // Total number of matching recipes

    res.status(200).json({
      recipes, // The paginated recipes
      totalCount, // Total number of matching recipes
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('Error fetching recipes by name:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRecipesByIngredients = async (req, res) => {
  const ingredients = req.query.ingredients;
  const page = parseInt(req.query.page) || 1; // Get the current page, default is 1
  const limit = parseInt(req.query.number) || 10; // Get the items per page, default is 10
  const skip = (page - 1) * limit; // Calculate how many items to skip

  console.log(`Searching for recipes with ingredients: ${ingredients}`);
  try {
    let recipesArray;
    let totalCount;

    if (!ingredients) {
      recipesArray = await RecipeModel.find({}).skip(skip).limit(limit); // Apply pagination
      totalCount = await RecipeModel.countDocuments({});
    } else {
      const ingredientsArray = ingredients
        .split(',')
        .map((ingredient) => ingredient.trim());

      const regexQueries = ingredientsArray.map((ingredient) => ({
        ingredients: { $regex: new RegExp(ingredient, 'i') },
      }));

      console.log('Regex Queries:', regexQueries);

      recipesArray = await RecipeModel.find({
        $and: regexQueries,
      })
        .skip(skip)
        .limit(limit); // Apply pagination

      totalCount = await RecipeModel.countDocuments({
        $and: regexQueries,
      });
    }

    console.log('Recipes Array:', recipesArray);
    console.log('Total Count:', totalCount);

    res.status(200).json({
      recipes: recipesArray,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('Error fetching recipes by ingredients:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//* Recipe by diet
const getRecipesByDiet = async (req, res) => {
  const diet = req.query.diet;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.number) || 10;
  const skip = (page - 1) * limit;

  console.log(`Searching for recipes with diet: ${diet}`);
  try {
    let recipesArray;
    let totalCount;

    if (!diet) {
      recipesArray = await RecipeModel.find({}).skip(skip).limit(limit);
      totalCount = await RecipeModel.countDocuments({});
    } else {
      const dietsArray = diet.split(',').map((d) => d.trim());
      console.log('Diets Array:', dietsArray);

      const regexQueries = dietsArray.map((d) => ({
        diet: { $regex: new RegExp(d, 'i') },
      }));

      console.log('Regex Queries:', regexQueries);

      recipesArray = await RecipeModel.find({
        $and: regexQueries,
      })
        .skip(skip)
        .limit(limit);

      totalCount = await RecipeModel.countDocuments({
        $and: regexQueries,
      });
    }

    console.log('Recipes Array:', recipesArray);
    console.log('Total Count:', totalCount);

    res.status(200).json({
      recipes: recipesArray,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('Error fetching recipes by diet:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//* Function that tries to fetch a recipe by ID from the model. -> 200, 404 or 500
const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.recipeid; //* req.params.recipeid: ID we fetch from the URL
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

//* Function that tries to like a recipe. -> 200, 400 or 500
const likeRecipe = async (req, res) => {
  const { userId, recipeId } = req.body;

  try {
    //* Check if the user has already liked the recipe
    const recipeToLike = await Recipe.findOne({ _id: recipeId });
    const isRecipeLiked = recipeToLike.likes.includes(userId) ? true : false; //* Check if user is already in likes array
    if (isRecipeLiked) {
      return res
        .status(400)
        .json({ message: 'You have already liked this recipe' });
    }

    const addLikeToRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        $addToSet: { likes: userId }, //* $addToSet: MongoDB operator that adds a value to an array unless the value is already present.
      },
      { new: true }
    );
    //add liked recipe to the array of liked recipes from the user
    //1. finding the user using the userId
    //2. adding the recipeId to the likedRecipes array
    const addLikeToUserLikedRecipes = await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: { likedRecipes: recipeId },
      },
      { new: true }
    );
    console.log('addLikeToUserLikedRecipes :>> ', addLikeToUserLikedRecipes);

    res.status(200).json({ message: 'Recipe liked successfully' });
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const unlikeRecipe = async (req, res) => {
  const { userId, recipeId } = req.body; //* ID we fetch from the token
  // console.log('req.body :>> ', req.body);
  try {
    const recipeToUnlike = await Recipe.findOne({ _id: recipeId }); //* Find the recipe by ID
    const isRecipeLiked = recipeToUnlike.likes.includes(userId) ? true : false;
    // console.log('isRecipeLiked :>> ', isRecipeLiked);
    if (!isRecipeLiked) {
      return res
        .status(400)
        .json({ message: 'You have not liked this recipe yet' });
    }

    const removeLikeFromUserLikedRecipes = await User.findByIdAndUpdate(
      userId,
      {
        $pull: { likedRecipes: recipeId }, //* $pull: MongoDB operator: removes a value from an array.
      },
      { new: true }
    );
    console.log(
      'removeLikeFromUserLikedRecipes :>> ',
      removeLikeFromUserLikedRecipes
    );
    const removeLikeFromRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        $pull: { likes: userId }, //* pulls the userId from the likes array
      },
      { new: true }
    );
    console.log(
      'removeLikeFromUserLikedRecipes :>> ',
      removeLikeFromUserLikedRecipes
    );

    res.status(200).json({ message: 'Recipe unliked successfully' });
  } catch (error) {
    console.log('error :>> ', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getUserLikes = async (req, res) => {
  try {
    const userId = req.user.id; //* ID we fetch from the token
    const likes = await Like.find({ userId }).populate('recipeId'); //* Find the likes by userId and populate the recipeId field by the Recipe model
    const likedRecipeIds = likes.map((like) => like.recipeId._id); //* Map the likes to get the recipeId

    res.status(200).json({ likes: likedRecipeIds });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// const rating = asyncHandler(async (req, res) => {
//   const { _id } = req.user;
//   const { star, recipeId } = req.body;
//   const recipe = await Recipe.findById(recipeId);
//   let alreadyRated = recipe.ratings.find(
//     (userId) => userId.postedby.toString() === _id.toString()
//   );
//   if (alreadyRated) {
//     return res.status(400).json({ message: 'Recipe already rated' });
//   } //* CONTINUE RATING CODE
// });

export {
  allRecipes,
  createRecipe,
  getRecipesByName,
  getRecipesByIngredients,
  getRecipesByDiet,
  getRecipeById,
  likeRecipe,
  unlikeRecipe,
  getUserLikes,
  // rating,
};
