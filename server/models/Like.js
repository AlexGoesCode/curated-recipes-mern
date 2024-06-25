import mongoose from 'mongoose';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: true,
    },
  },
  { timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
