import { Recipe } from '../types/Types';
import GridItem from './GridItem';
import Pagination from './Pagination';
import { useState } from 'react';

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
  const [likedItems, setLikedItems] = useState<string[]>(likedRecipes);

  const handleLike = async (itemId: string) => {
    if (likedItems.includes(itemId)) return;

    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer your-auth-token`, // Replace with actual auth token
        },
        body: JSON.stringify({ userId: 'your-user-id', recipeId: itemId }),
      });

      if (response.ok) {
        setLikedItems((prevLikedItems) => [...prevLikedItems, itemId]);
      } else {
        const data = await response.json();
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error liking recipe:', error);
    }
  };

  console.log('Rendering GridList with items:', items); // Debug log
  console.log('Total items:', items.length); // Additional log for item count

  return (
    <div className='grid-list'>
      <div className='grid grid-cols-5 gap-4 mb-4'>
        {items.slice(0, 5).map((item) => (
          <GridItem
            key={item._id}
            item={item}
            liked={item._id ? likedItems.includes(item._id) : false} // Check if _id is defined
            onItemClick={onItemClick}
            onLike={handleLike} // Pass down the handleLike function
          />
        ))}
      </div>
      <div className='grid grid-cols-5 gap-4'>
        {items.slice(5, 10).map((item) => (
          <GridItem
            key={item._id}
            item={item}
            liked={item._id ? likedItems.includes(item._id) : false} // Check if _id is defined
            onItemClick={onItemClick}
            onLike={handleLike} // Pass down the handleLike function
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
