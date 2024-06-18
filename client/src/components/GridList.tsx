import { Recipe } from '../types/Types';
import GridItem from './GridItem';
import Pagination from './Pagination';

// Interface for the props that the GridList component will receive
interface GridListProps {
  items: Recipe[];
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

//1. make clickable (with a link) the element of your choice (either the whole div, or just the image), by wrapping it in a Link element (from react router) https://reactrouter.com/en/main/components/link
//2.inside <SingleRecipe/> grab the recipeId from the URL ,store it in a variable with useParams() hook from react router https://reactrouter.com/en/main/hooks/use-params
//3. Inside <SingleRecipe/> build a fetch function that makes a fetch request to your backend end point, using the variable you created storing the parameter from the url.
//4. Create a state variable to store the recipe coming from your API.
//5. Build your JSX code to render the recipe.
