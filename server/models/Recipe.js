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
    diet: { type: String },
    difficulty: { type: String },
    // totalrating: { type: string, default: 0 },
  },
  { timestamps: true }
);

const Recipe = mongoose.model('Recipe', recipeSchema);
export default Recipe;
