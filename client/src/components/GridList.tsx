import { Recipe } from '../types/Types';
import GridItem from './GridItem';
import Pagination from './Pagination';

interface GridListProps {
  items: Recipe[];
  likedRecipes: string[]; // Array of liked recipe IDs
  onItemClick: (item: Recipe) => void;
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

function GridList({
  items = [], // Default to an empty array
  likedRecipes = [], // Default to an empty array
  onItemClick,
  totalPages,
  currentPage,
  handlePageChange,
}: GridListProps) {
  console.log('Rendering GridList with items:', items); // Debug log
  console.log('Total items:', items.length); // Additional log for item count

  return (
    <div className='grid-list'>
      <div className='grid grid-cols-5 gap-4 mb-4'>
        {items.slice(0, 5).map((item) => (
          <GridItem
            key={item._id}
            item={item}
            liked={item._id ? likedRecipes.includes(item._id) : false} // Check if _id is defined
            onItemClick={onItemClick}
          />
        ))}
      </div>
      <div className='grid grid-cols-5 gap-4'>
        {items.slice(5, 10).map((item) => (
          <GridItem
            key={item._id}
            item={item}
            liked={item._id ? likedRecipes.includes(item._id) : false} // Check if _id is defined
            onItemClick={onItemClick}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default GridList;
