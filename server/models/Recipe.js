import mongoose from 'mongoose';
const { Schema } = mongoose;

const recipeSchema = new Schema(
  {
    name: { type: String, required: true },
    origin: { type: String, required: true },
    ingredients: { type: [String], required: true },
    instructions: { type: String, required: true },
    // likes: { type: Number, default: 0 },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  },
  { timestamps: true }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
