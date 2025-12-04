import { useEffect, useState, useCallback } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import Pagination from '../components/Pagination';
import { Recipe } from '../types/Types';
import { debounce } from '../utils/debounce';
import { fetchRecipesApi } from '../api/recipes';

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

  const handleResize = useCallback(() => {
    setItemsPerPage(window.innerWidth < MOBILE_BREAKPOINT ? 5 : 10);
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 300);
    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize);
  }, [handleResize]);

  const fetchData = useCallback(async () => {
    // console.log('%c fetching recipes', 'color: red');
    console.log('%c fetching recipes (NEW API)', 'color: red');

    try {
      const data = await fetchRecipesApi({
        searchBy,
        searchTerm,
        page: currentPage,
        limit: itemsPerPage,
      });

      console.log('Fetched data:', data);

      if (Array.isArray(data)) {
        setItems(data);
        setTotalPages(Math.ceil(data.length / itemsPerPage) || 1);
      } else if (data && Array.isArray(data.recipes)) {
        setItems(data.recipes);
        setTotalPages(Math.ceil(data.totalCount / itemsPerPage) || 1);
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

  console.log('Items before passing to GridList:', items);

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
