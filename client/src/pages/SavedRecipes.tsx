import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Types';
import GridList from '../components/GridList';
import Pagination from '../components/Pagination';
import { useAuth } from '../context/AuthContext';

const SavedRecipes = () => {
  const { user, getUserProfile } = useAuth();
  const [items, setItems] = useState<Recipe[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  if (!user) {
    return <div>Please log in to see saved recipes</div>;
  }

  console.log('user.likedRecipes :>> ', user.likedRecipes);

  // Adjust fetchData to match expected signature in GridListProps
  const fetchData = async () => {
    getUserProfile();
    const likedRecipes = user.likedRecipes || [];
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedItems = likedRecipes.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    setItems(paginatedItems);
    setTotalPages(Math.ceil(likedRecipes.length / itemsPerPage));
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, user]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1>Saved Recipes</h1>
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

export default SavedRecipes;
