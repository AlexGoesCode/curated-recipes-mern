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

  //* splits the ingredients string into an array
  const arrayOfIngredients = req.body.ingredients.split(',');
  console.log('arrayOfIngredients :>> ', arrayOfIngredients);
  console.log('req.file :>> ', req.file);

  //* If there is a file in the request, upload it to Cloudinary
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
        diet: req.body.diet,
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
  /* Some code to build the pagination :1
  the variables below woudl need to be recieved from the front end in the request. And change accordinglly to the next/prev page button clicked by the user.
  const finalRecipe = 5;
  const initialRecipe = 0; */

  //* Fetch the name from the query
  try {
    const name = req.query.name;
    const recipes = await RecipeModel.find({
      name: { $regex: name, $options: 'i' }, //* $regex: MongoDB operator that allows us to search for a string in a field.
    });
    /* Some code to build the pagination :2
    the variable recipiesResponse below, would use .slice() and the numbers finalRecipe and intialRecipe, to create a new array with the number of recipies we want to display in the page.
    const recipiesResponse = recipes.slice(initialRecipe, numberOfRecipes);*/
    if (recipes.length) {
      res.status(200).json(recipes);
      /* Some code to build the pagination :3
      the response below would send the array of LIMITED recipies to the front end.*/
      // res.status(200).json(recipiesResponse);
    } else {
      res.status(404).json({ message: 'No recipes found with that name' });
    }
  } catch (error) {
    console.error('Error fetching recipes by name:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getRecipesByIngredients = async (req, res) => {
  const ingredients = req.query.ingredients;
  console.log(`Searching for recipes with ingredients: ${ingredients}`);
  try {
    let recipesArray;
    if (!ingredients) {
      // Fetch all recipes if ingredients are not provided or is an empty string
      recipesArray = await RecipeModel.find({});
    } else {
      // Split the ingredients string into an array and trim whitespace
      const ingredientsArray = ingredients
        .split(',')
        .map((ingredient) => ingredient.trim());
      // Create an array of regex queries for each ingredient
      const regexQueries = ingredientsArray.map((ingredient) => ({
        ingredients: { $regex: new RegExp(ingredient, 'i') },
      }));
      // Perform the search with the provided ingredients
      recipesArray = await RecipeModel.find({
        $and: regexQueries, // Use $and operator to match all ingredients
      });
    }
    console.log(`Found ${recipesArray.length} recipes`);
    res.status(200).json(recipesArray);
  } catch (error) {
    console.log('Error fetching recipes:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//* Recipe by diet
const getRecipesByDiet = async (req, res) => {
  const diet = req.query.diet;
  console.log(`Searching for recipes with diet: ${diet}`);
  try {
    let recipesArray;
    if (!diet) {
      // Fetch all recipes if diet is not provided or is an empty string
      recipesArray = await RecipeModel.find({});
    } else {
      // Perform the search with the provided diet
      recipesArray = await RecipeModel.find({
        diet: { $regex: new RegExp(diet, 'i') },
      });
    }
    console.log(`Found ${recipesArray.length} recipes`);
    res.status(200).json(recipesArray);
  } catch (error) {
    console.log('Error fetching recipes:', error);
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
