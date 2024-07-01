import { Link, useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Types';
import LikeButton from './LikeButton';

interface GridItemProps {
  item: Recipe;
  liked: boolean;

  onLike: (recipeId: string) => void;
}

const GridItem = ({ item, liked, onLike }: GridItemProps) => {
  const handleLikeClick = (recipeId: string) => {
    onLike(recipeId);
  };

  return (
    <div className='p-4 border rounded shadow-md cursor-pointer'>
      {item.imageUrl && (
        <Link to={`/recipes/${item._id}`}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className='w-full h-48 object-cover rounded-md'
          />
        </Link>
      )}
      <h3 className='text-lg font-bold mt-2 text-gray-100'>{item.name}</h3>
      <p className='text-gray-100'>{item.origin}</p>

      <p className='text-gray-100'>Likes Number:{item.likes?.length}</p>
      <LikeButton
        recipeId={item._id}
        userId={'your-user-id'} // Replace with dynamic user ID if available
        likedRecipes={liked ? [item._id] : []}
        onLike={handleLikeClick} // Pass down the handleLike function
      />
    </div>
  );
};

export default GridItem;
