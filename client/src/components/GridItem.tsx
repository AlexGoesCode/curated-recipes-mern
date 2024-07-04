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
        // userId={'your-user-id'} // Replace with dynamic user ID if available
        isLiked={isLiked}
        // Pass down the handleLike function
        fetchData={fetchData}
      />
    </div>
  );
};

export default GridItem;
