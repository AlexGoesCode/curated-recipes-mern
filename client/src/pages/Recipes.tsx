import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import { fetchUserLikes } from '../api/user';
import { Recipe } from '../types/Types';
import { useAuth } from '../context/AuthContext';

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
    console.log('%c fetching recipes', 'color: red');
    try {
      const response = await fetch(
        `http://localhost:5022/api/curated-recipes/recipesby${searchBy}?${searchBy}=${searchTerm}&page=${currentPage}&number=10`
      );
      const data = await response.json();
      console.log('Fetched data:', data);

      if (Array.isArray(data)) {
        setItems(data);
      } else if (data && Array.isArray(data.recipes)) {
        setItems(data.recipes);
      } else {
        console.warn('Unexpected data format:', data);
        setItems([]);
      }

      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, searchBy, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchData();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  console.log('Items before passing to GridList:', items); // Debug log

  return (
    <div>
      <SearchBar
        handleSearch={handleSearch}
        setSearchTerm={setSearchTerm}
        setSearchBy={setSearchBy}
      />
      <GridList
        items={items}
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Recipes;
