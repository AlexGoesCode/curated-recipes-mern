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
    required: true,
    unique: false,
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
  time: {
    type: Number,
    required: false,
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
