import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import Pagination from '../components/Pagination';
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
    console.log('%c fetching recipes', 'color: red');
    console.log('Search Term:', searchTerm); // Log the search term
    console.log('Search By:', searchBy); // Log the search type

    try {
      let url = `http://localhost:5022/api/curated-recipes/recipesby${searchBy}?${searchBy}=${searchTerm}&page=${currentPage}&number=10`;

      console.log('Fetching URL:', url); // Log the final API URL

      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched data:', data);

      if (Array.isArray(data)) {
        setItems(data);
        setTotalPages(Math.ceil(data.length / 10) || 1); // Assuming 5 items per page
      } else if (data && Array.isArray(data.recipes)) {
        setItems(data.recipes);
        setTotalPages(Math.ceil(data.totalCount / 10) || 1); // Use totalCount from API response
      } else {
        console.warn('Unexpected data format:', data);
        setItems([]);
        setTotalPages(1);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setItems([]);
      setTotalPages(1);
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
      <GridList items={items} fetchData={fetchData} />
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Recipes;
