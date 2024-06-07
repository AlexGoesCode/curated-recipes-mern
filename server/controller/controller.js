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

export { allRecipes };
