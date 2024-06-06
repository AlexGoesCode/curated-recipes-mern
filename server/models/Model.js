import mongoose from 'mongoose';

const { Schema } = mongoose;

const recipeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  origin: {
    type: String,
    required: false,
  },

  ingredients: {
    type: [String],
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  time: {
    type: Number,
    required: false,
  },
  difficulty: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: false,
  },
});

const RecipeModel = mongoose.model('recipes', recipeSchema);

export default RecipeModel;
