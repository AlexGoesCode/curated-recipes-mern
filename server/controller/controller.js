import RecipeModel from '../models/Model.js';

const allRecipes = async (req, res) => {
  // Fixed the router variable name
  try {
    const allRecipes = await RecipeModel.find({});
    console.log('allRecipes', allRecipes);
    res.json(allRecipes); // Added response to send the data back
  } catch (error) {
    console.error('Error fetching recipes:', error);
    res.status(500).send('Internal Server Error'); // Added error handling
  }
};

export { allRecipes };
