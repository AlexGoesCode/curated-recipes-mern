import GridItem from './GridItem';
import { Recipe } from '../types/Types';
import { useAuth } from '../context/AuthContext';

interface GridListProps {
  items: Recipe[];
  fetchData: () => Promise<void>;
}

function GridList({ items, fetchData }: GridListProps) {
  const { user } = useAuth();

  console.log('Rendering GridList with items:', items);
  console.log('Total items:', items.length);

  return (
    <div className='p-4'>
      <div className='flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-4 mb-4'>
          {items.map((item) => (
            <GridItem
              key={item._id}
              item={item}
              isLiked={item._id ? item.likes.includes(user!.id) : false}
              fetchData={fetchData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GridList;
