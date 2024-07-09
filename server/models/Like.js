import mongoose from 'mongoose';

//* Like schema to store the likes
const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
    required: true,
  },
});

const Like = mongoose.model('Like', likeSchema);

export default Like;
