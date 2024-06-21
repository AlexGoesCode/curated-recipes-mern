import mongoose from 'mongoose';

const { Schema } = mongoose;

const recipeSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
    unique: false,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  diet: {
    type: String,
    enum: ['none', 'vegetarian', 'vegan', 'gluten-free', 'dairy-free'],
  },
  countryOrigin: {
    type: String,
    required: false,
    unique: false,
  },
  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
  },
});

const RecipeModel = mongoose.model('recipe', recipeSchema);

export default RecipeModel;
