import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Types';
import GridList from '../components/GridList';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('savedRecipes');
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }
  }, []);

  const handleItemClick = (item: Recipe) => {
    // Navigate to the Single Recipe page
    navigate(`/recipes/${item._id}`);
  };

  return (
    <div>
      <h1 className='text-center text-3xl my-4'>Saved Recipes</h1>
      <GridList
        items={savedRecipes}
        likedRecipes={[]} // Pass likedRecipes prop (add logic if needed)
        onItemClick={handleItemClick}
        totalPages={1}
        currentPage={1}
        handlePageChange={() => {}}
      />
    </div>
  );
};

export default SavedRecipes;
