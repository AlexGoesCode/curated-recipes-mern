import { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import GridList from '../components/GridList';
import { fetchUserLikes } from '../api/User';
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
  const [userLikes, setUserLikes] = useState<string[]>([]);
  const { token } = useAuth();

  // Fetch data based on searchTerm, searchBy, and currentPage
  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5022/api/curated-recipes/recipesby${searchBy}?${searchBy}=${searchTerm}&page=${currentPage}`
      );
      const data = await response.json();
      console.log('data :>> ', data);

      // Check if the data contains the recipes array or is an array itself
      if (Array.isArray(data)) {
        console.log('Setting items with data:', data);
        setItems(data); // Set the data directly if it is an array
      } else if (data && Array.isArray(data.recipes)) {
        console.log('Setting items with data.recipes:', data.recipes);
        setItems(data.recipes); // Set the recipes if it is a property
      } else {
        console.warn('Unexpected data format:', data);
        setItems([]); // Set to an empty array if the data format is unexpected
      }

      setTotalPages(data.totalPages || 1); // Ensure `data.totalPages` is set correctly
      console.log('Items state after setting:', items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, searchBy, currentPage]);

  useEffect(() => {
    const fetchLikes = async () => {
      if (token) {
        const likes = await fetchUserLikes(token); // Fetch user likes
        setUserLikes(likes);
      }
    };

    fetchLikes();
  }, [token]);

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

  console.log('Items before passing to GridList:', items); // Debug log

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
          likedRecipes={userLikes} // Pass the liked recipes array
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
