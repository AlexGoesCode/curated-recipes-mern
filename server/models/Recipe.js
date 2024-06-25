// server/models/Recipe.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    origin: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
