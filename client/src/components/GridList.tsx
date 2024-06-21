import { Recipe } from '../types/Types';
import GridItem from './GridItem';
import Pagination from './Pagination';

// Interface for the props that the GridList component will receive
interface GridListProps {
  items: Recipe[];
  onItemClick: (item: Recipe) => void;
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

// GridList component
function GridList({
  items,
  onItemClick,
  totalPages,
  currentPage,
  handlePageChange,
}: GridListProps) {
  return (
    <div className='grid-list'>
      <div className='grid grid-cols-5 gap-4 mb-4'>
        {items.slice(0, 5).map((item) => (
          <GridItem key={item._id} item={item} onItemClick={onItemClick} />
        ))}
      </div>
      <div className='grid grid-cols-5 gap-4'>
        {items.slice(5, 10).map((item) => (
          <GridItem key={item._id} item={item} onItemClick={onItemClick} />
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
