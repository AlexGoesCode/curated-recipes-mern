interface GridItem {
  id: string;
  title: string;
  image: string;
}

// interface for the props that the CharactersGrid component will receive
interface GridItemProps {
  items: GridItem[]; // pass a list of characters that the GridItem component will display.
  onItemClick: (character: GridItem) => void; // Prop to handle character click
}

const GridItem = ({ items, onItemClick }: GridItemProps) => {
  return (
    <div className='grid-container'>
      {items.map((item) => (
        <div
          key={item.id}
          className='grid-item'
          onClick={() => onItemClick(item)}
        >
          <img src={item.image} alt={item.title} />
          <p>{item.title}</p>
          <button onClick={() => onItemClick(item)}>View Details</button>
        </div>
      ))}
    </div>
  );
};

export default GridItem;
