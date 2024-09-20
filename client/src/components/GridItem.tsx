import { Link, useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Types';
import LikeButton from './LikeButton';
import { useAuth } from '../context/AuthContext';

interface GridItemProps {
  item: Recipe;
  isLiked: boolean;
  fetchData: () => Promise<void>;
}

const GridItem = ({ item, isLiked, fetchData }: GridItemProps) => {
  const { user } = useAuth();

  return (
    <div className='relative bg-gray-900 bg-opacity-50 w-56 p-4 border rounded-2xl shadow-md cursor-pointer'>
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
      <p className='text-gray-100'>{item.origin}</p>
      <p className='text-gray-100'>{item.likes?.length} Likes</p>
      <p className='text-gray-100'>
        Diet:{' '}
        {Array.isArray(item.diet) && item.diet.length > 0
          ? item.diet.join(', ')
          : 'none'}
      </p>
      <div className='absolute bottom-2 right-2 '>
        <LikeButton
          recipeId={item._id}
          // userId={'your-user-id'} // Replace with dynamic user ID if available
          isLiked={isLiked}
          // Pass down the handleLike function
          fetchData={fetchData}
        />
      </div>
    </div>
  );
};

export default GridItem;
