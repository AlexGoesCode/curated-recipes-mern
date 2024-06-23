import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import { Recipe } from '../types/Types';

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<
    'name' | 'ingredients' | 'diet' | 'id'
  >('name');
  const [items, setItems] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data based on searchTerm, searchBy, and currentPage
  const fetchData = async () => {
    let endpoint = '';
    if (searchBy === 'name') {
      endpoint = `http://localhost:5022/api/curated-recipes/recipesbyname?name=${searchTerm}&page=${currentPage}`;
    } else if (searchBy === 'ingredients') {
      endpoint = `http://localhost:5022/api/curated-recipes/recipesbyingredients?ingredients=${searchTerm}&page=${currentPage}`;
    } else if (searchBy === 'diet') {
      endpoint = `http://localhost:5022/api/curated-recipes/recipesbydiet?diet=${searchTerm}&page=${currentPage}`;
    } else if (searchBy === 'id') {
      endpoint = `http://localhost:5022/api/curated-recipes/${searchTerm}`;
    }

    try {
      const response = await fetch(endpoint);
      if (searchBy === 'id') {
        const data = await response.json();
        setItems([data.data]);
        setTotalPages(1);
      } else {
        const data = await response.json();
        setItems(data.recipes);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      fetchData();
    }
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
          setSearchBy={setSearchBy}
        />
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
