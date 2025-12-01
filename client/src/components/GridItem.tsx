import { Link } from 'react-router-dom';
import { Recipe } from '../types/Types';
import LikeButton from './LikeButton';
import { memo } from 'react';

interface GridItemProps {
  item: Recipe;
  isLiked: boolean;
  fetchData: () => Promise<void>;
}

const GridItem = memo(({ item, isLiked, fetchData }: GridItemProps) => {
  return (
    <div className='relative bg-gray-900 bg-opacity-60 w-56 p-4 border rounded-2xl shadow-md cursor-pointer'>
      {item.picture && (
        <Link to={`/recipes/${item._id}`}>
          <img
            src={item.picture}
            alt={item.name}
            className='w-full h-48 object-cover rounded-xl'
          />
        </Link>
      )}
      <h3 className='text-lg font-bold mt-2 text-gray-100'>{item.name}</h3>
      <p className='text-gray-100'>
        Diet: {Array.isArray(item.diet) ? item.diet.join(', ') : 'none'}
      </p>
      <p className='text-gray-100'>{item.origin}</p>
      <p className='text-gray-100'>{item.likes?.length} Likes</p>

      <div className='absolute bottom-2 right-2'>
        <LikeButton
          recipeId={item._id}
          isLiked={isLiked}
          fetchData={fetchData}
        />
      </div>
    </div>
  );
});

export default GridItem;
