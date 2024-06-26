import { Recipe } from '../types/Types';
import LikeButton from './LikeButton';

interface GridItemProps {
  item: Recipe;
  liked: boolean;
  onItemClick: (item: Recipe) => void;
  onLike: (recipeId: string) => void;
}

const GridItem = ({ item, liked, onItemClick, onLike }: GridItemProps) => {
  return (
    <div className='grid-item' onClick={() => onItemClick(item)}>
      <h3>{item.name}</h3>
      <LikeButton
        recipeId={item._id}
        userId={'your-user-id'} // Replace with dynamic user ID if available
        likedRecipes={liked ? [item._id] : []}
        onLike={() => onLike(item._id)}
      />
    </div>
  );
};

export default GridItem;
