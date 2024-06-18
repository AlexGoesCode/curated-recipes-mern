import { Recipe } from '../types/Types';

interface GridItem {
  id: string;
  title: string;
  image: string;
}

// interface for the props that the CharactersGrid component will receive
interface GridItemProps {
  items: Recipe[]; // pass a list of characters that the GridItem component will display.
  onItemClick: (character: GridItem) => void; // Prop to handle character click
}

const GridItem = ({ items, onItemClick }: GridItemProps) => {
  return (
    <div className='grid-container'>
      {items.map((item) => (
        <div
          key={item._id}
          className='grid-item'
          onClick={() => onItemClick(item)}
        >
          <img src={item.imageUrl} alt={item.name} style={{ width: '150px' }} />
          <p style={{ color: 'white' }}>{item.name}</p>
          <button onClick={() => onItemClick()}>View Details</button>
        </div>
      ))}
    </div>
  );
};

export default GridItem;
