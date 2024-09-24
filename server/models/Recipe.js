import mongoose from 'mongoose';
const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    origin: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    picture: { type: String },
    diet: [{ type: String }], // Changed to an array of strings
    difficulty: { type: String },
    // totalrating: { type: string, default: 0 },
  },
  { timestamps: true }
);

const RecipeModel = mongoose.model('Recipe', recipeSchema);
export default RecipeModel;
