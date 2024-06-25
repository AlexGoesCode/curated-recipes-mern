// components/GridItem.tsx
import React from 'react';
import { Recipe } from '../types/Types';
import LikeButton from './LikeButton';

interface GridItemProps {
  item: Recipe;
  liked: boolean;
  onItemClick: (item: Recipe) => void;
}

const GridItem = ({ item, liked, onItemClick }: GridItemProps) => {
  return (
    <div className='grid-item' onClick={() => onItemClick(item)}>
      <h3>{item.name}</h3>
      <LikeButton
        recipeId={item._id}
        userId={userId}
        likedRecipes={likedRecipes}
      />
    </div>
  );
};

export default GridItem;
