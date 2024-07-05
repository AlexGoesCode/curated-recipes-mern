import { useState } from 'react';
import GridItem from './GridItem';
import Pagination from './Pagination';
import { Recipe } from '../types/Types';
import { useAuth } from '../context/AuthContext';

interface GridListProps {
  items: Recipe[];

  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  fetchData: () => Promise<void>;
}

function GridList({
  items,

  totalPages,
  currentPage,
  handlePageChange,
  fetchData,
}: GridListProps) {
  // console.log('items :>> ', items);

  const { user } = useAuth();

  console.log('Rendering GridList with items:', items); // Debug log
  console.log('Total items:', items.length); // Additional log for item count

  return (
    <div className='p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4'>
        {items.map((item) => (
          <GridItem
            key={item._id}
            item={item}
            isLiked={item._id ? item.likes.includes(user!.id) : false} // Check if _id is defined
            fetchData={fetchData}
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
