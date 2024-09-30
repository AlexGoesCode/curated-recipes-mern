import { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import Pagination from '../components/Pagination';
import { Recipe } from '../types/Types';
import { baseUrl } from '../config';

const MOBILE_BREAKPOINT = 640;

const Recipes = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchBy, setSearchBy] = useState<
    'name' | 'ingredients' | 'diet' | 'id'
  >('name');
  const [items, setItems] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(
    window.innerWidth < MOBILE_BREAKPOINT ? 5 : 10
  );

  // Debounced resize handler
  const handleResize = useCallback(() => {
    setItemsPerPage(window.innerWidth < MOBILE_BREAKPOINT ? 5 : 10);
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [handleResize]);

  // Fetch data based on searchTerm, searchBy, currentPage, and itemsPerPage
  const fetchData = useCallback(async () => {
    console.log('%c fetching recipes', 'color: red');
    console.log('Search Term:', searchTerm); // Log the search term
    console.log('Search By:', searchBy); // Log the search type

    try {
      const url = `${baseUrl}/api/curated-recipes/recipesby${searchBy}?${searchBy}=${searchTerm}&page=${currentPage}&number=${itemsPerPage}`;
      console.log('Fetching URL:', url); // Log the final API URL

      const response = await fetch(url);
      const data = await response.json();
      console.log('Fetched data:', data);

      if (Array.isArray(data)) {
        setItems(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage) || 1); // Use itemsPerPage
      } else if (data && Array.isArray(data.recipes)) {
        setItems(data.recipes);
        setTotalPages(Math.ceil(data.totalCount / itemsPerPage) || 1); // Use itemsPerPage
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
  }, [searchTerm, searchBy, currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

// Debounce function to limit the rate at which a function can fire.
function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default Recipes;
