import RecipeModel from '../models/Model.js';

const allRecipes = async (req, res) => {
  console.log('req :>> '.bgYellow, req);
  try {
    const allRecipes = await RecipeModel.find({});
    console.log('allRecipes', allRecipes);

    res.status(200).json({ number: allRecipes.length, allRecipes }); // Added response status + number of recipes
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Internal Server Error'); // Added error handling
  }
};

const recipesByIngredient = async (req, res) => {
  // console.log('req :>> '.bgYellow, req);
  // try {
  //   const allRecipes = await RecipeModel.find({
  //     ingredients: { $all: ingredients.split(',') },
  //   });
  //   console.log('allRecipes', allRecipes);
  //   res.status(200).json({ number: allRecipes.length, allRecipes }); // Added response status + number of recipes
  // } catch (error) {
  //   console.error('Error fetching recipes:', error);
  //   res.status(500).send('Internal Server Error'); // Added error handling
  // }
};

const getRecipesByIngredients = async (req, res) => {
  console.log('req :>> ', req.query);

  ////////////
  //scenario 1: user can search for 1 ingredient
  //1. extract the ingredient from the query
  const ingredient = req.query.ingredients;

  console.log('ingredient :>> ', ingredient);
  //2. make a query to the database for the ingredient with method .find()
  //2.1 create a variable that is gonna store the result of the query.

  //2.2 use the RecipeModel to make the query
  //2.3 use the method .find() to make the query
  //2.4 pass the ingredient as a parameter to the method .find()
  try {
    const recipesArray = await RecipeModel.find({
      ingredients: { $elemMatch: { $in: ingredient } },
    });
    console.log('recipesArray :>> ', recipesArray);
    //3. send result from our database to the client
    //a) scenario 1: we found some recipes in our database
    res.status(200).json(recipesArray);
  } catch (error) {
    console.log('error', error);
  }

  ////////////

  ////////////
  //scenario 2: user can search for more than 1 ingredient
  // Manipulate the list of ingredients the user typed in the search:
  //1: transform the string into an array of ingredients.
  //2: do a loop to make a query for each ingredient.
  ////////////
};

const getRecipeById = async (req, res) => {
  console.log('get recipes by id working');
  console.log('req>>>>', req);

  //1. extract the recipeId from the request object (inside params object)

  //2. create a variable that is gonna store the recipe (only one an object) we want to find in our DB

  //3. inside that variable, use the mongoose model (recipeModel) to find the recipe using the id :https://mongoosejs.com/docs/api/model.html#Model.findById()

  //4. send a response to the client with that recipe (you have to see it in postman)
};
export {
  allRecipes,
  recipesByIngredient,
  getRecipesByIngredients,
  getRecipeById,
};
