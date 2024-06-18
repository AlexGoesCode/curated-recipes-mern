import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import GridItem from '../components/GridItem';
import { Recipe } from '../types/Types';

const Recipes = () => {
  // const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  // Fetch data based on searchQuery and currentPage
  const fetchData = async () => {
    // Example fetch function, replace with your actual data fetching logic
    const response = await fetch(
      `http://localhost:5022/api/curated-recipes/recipesbyingredients?ingredients=${searchTerm}&page=${currentPage}`
    );
    const data = await response.json();
    console.log('data :>> ', data);
    setItems(data);
    setTotalPages(data.totalPages);
  };
  // useEffect(() => {

  //   fetchData();
  // }, [searchQuery, currentPage]);

  const handleSearch = () => {
    // setSearchQuery(query);
    fetchData();
    setCurrentPage(1); // Reset to the first page on a new search
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemClick = (item: GridItem) => {
    // Handle item click (e.g., navigate to a details page)
    console.log('Item clicked:', item);
  };

  return (
    <div>
      <div>
        <SearchBar handleSearch={handleSearch} setSearchTerm={setSearchTerm} />
      </div>
      <div>
        <GridList
          items={items}
          onItemClick={handleItemClick}
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Recipes;
