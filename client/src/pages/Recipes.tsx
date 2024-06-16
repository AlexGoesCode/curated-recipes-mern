import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import GridItem from '../components/GridItem';

const Recipes = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch data based on searchQuery and currentPage
    const fetchData = async () => {
      // Example fetch function, replace with your actual data fetching logic
      const response = await fetch(
        `https://api.example.com/recipes?query=${searchQuery}&page=${currentPage}`
      );
      const data = await response.json();

      setItems(data.items);
      setTotalPages(data.totalPages);
    };

    fetchData();
  }, [searchQuery, currentPage]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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
    <div className='min-h-screen flex flex-col'>
      <div className='flex-shrink-0'>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className='flex-grow overflow-auto'>
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
