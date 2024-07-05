import RecipeModel from '../models/Recipe.js';
import Like from '../models/Like.js';
import Recipe from '../models/Recipe.js';
import User from '../models/User.js';
import { imageUpload } from '../utils/imageUpload.js';

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

const createRecipe = async (req, res) => {
  console.log('req.body :>> ', req.body);

  //!transforming the ingredients string into an array
  const arrayOfIngredients = req.body.ingredients.split(',');
  console.log('arrayOfIngredients :>> ', arrayOfIngredients);
  console.log('req.file :>> ', req.file);
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

const getRecipesByName = async (req, res) => {
  //* Some code to build the pagination :1
  //the variables below woudl need to be recieved from the front end in the request. And change accordinglly to the next/prev page button clicked by the user.
  // const finalRecipe = 5;
  // const initialRecipe = 0;

  try {
    const name = req.query.name;
    const recipes = await RecipeModel.find({
      name: { $regex: name, $options: 'i' },
    });
    //* Some code to build the pagination :2
    //the variable recipiesResponse below, would use .slice() and the numbers finalRecipe and intialRecipe, to create a new array with the number of recipies we want to display in the page.
    // const recipiesResponse = recipes.slice(initialRecipe, numberOfRecipes);
    if (recipes.length) {
      res.status(200).json(recipes);
      //* Some code to build the pagination :3
      // the response below would send the array of LIMITED recipies to the front end.
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
    const recipeToLike = await Recipe.findOne({ _id: recipeId });
    const isRecipeLiked = recipeToLike.likes.includes(userId) ? true : false;
    if (isRecipeLiked) {
      //!remove the like.
      return res
        .status(400)
        .json({ message: 'You have already liked this recipe' });
    }

    // Create a new like
    const addLikeToRecipe = await Recipe.findByIdAndUpdate(
      recipeId,
      {
        $addToSet: { likes: userId },
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
  const { userId, recipeId } = req.body;
  // console.log('req.body :>> ', req.body);
  try {
    const recipeToUnlike = await Recipe.findOne({ _id: recipeId });
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
        $pull: { likedRecipes: recipeId },
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
        $pull: { likes: userId },
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
    const userId = req.user.id; // Assuming the auth middleware sets req.user

    const likes = await Like.find({ userId }).populate('recipeId');
    const likedRecipeIds = likes.map((like) => like.recipeId._id);

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
