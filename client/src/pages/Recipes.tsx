import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import { Recipe } from '../types/Types';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<
    'name' | 'ingredients' | 'diet' | 'id'
  >('name'); // Include 'id' in the union type
  const [items, setItems] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data based on searchTerm, searchBy, and currentPage
  const fetchData = async () => {
    const response = await fetch(
      `http://localhost:5022/api/curated-recipes/recipesby${searchBy}?${searchBy}=${searchTerm}&page=${currentPage}`
    );
    const data = await response.json();
    console.log('data :>> ', data);
    setItems(data.recipes || []);
    setTotalPages(data.totalPages || 1);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, searchBy, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page on a new search
    fetchData();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemClick = (item: Recipe) => {
    // Handle item click (e.g., navigate to a details page)
    console.log('Item clicked:', item);
  };

  return (
    <div>
      <div>
        <SearchBar
          handleSearch={handleSearch}
          setSearchTerm={setSearchTerm}
          setSearchBy={setSearchBy} // Add this prop
        />
      </div>
      <div>
        <GridList
          items={items}
          likedRecipes={[]} // Pass likedRecipes prop (add logic if needed)
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
