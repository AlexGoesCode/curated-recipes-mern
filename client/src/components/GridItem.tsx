import { Link } from 'react-router-dom';
import { Recipe } from '../types/Types';

interface GridItemProps {
  item: Recipe; // single item to display
  liked: boolean;
  onItemClick: (item: Recipe) => void; // Prop to handle item click
}

const GridItem = ({ item, onItemClick }: GridItemProps) => {
  return (
    <div
      key={item._id}
      className='grid-item border p-4 cursor-pointer'
      onClick={() => onItemClick(item)}
    >
      <Link to={`/recipes/${item._id}`}>
        <img
          src={item.imageUrl}
          alt={item.name}
          className='w-full h-48 object-cover'
          style={{ width: '130px' }}
        />
      </Link>
      <p style={{ color: 'white' }}>{item.name}</p>
      <button
        onClick={(e) => {
          e.stopPropagation(); // This stops the click event from propagating to the parent div
          onItemClick(item);
        }}
      >
        View Details
      </button>
    </div>
  );
};

export default GridItem;
