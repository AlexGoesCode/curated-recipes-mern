import GridItem from './GridItem';
import Pagination from './Pagination';

// Interface for the props that the GridList component will receive
interface GridListProps {
  items: GridItem[];
  onItemClick: (item: GridItem) => void;
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
      <GridItem items={items} onItemClick={onItemClick} />
      {totalPages > 1 && ( // display pagination only if there is more than one page
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
