import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Types';
import GridList from '../components/GridList';
import { useAuth } from '../context/AuthContext';

const SavedRecipes = () => {
  const { user, getUserProfile } = useAuth();

  if (!user) {
    return <div>Please log in to see saved recipes</div>;
  }

  console.log('user.likedRecipes :>> ', user.likedRecipes);

  // Adjust fetchData to match expected signature in GridListProps
  const fetchData = async () => {
    getUserProfile();
  };

  return (
    <div>
      <h1 className='text-center text-3xl my-4'>Saved Recipes</h1>
      <GridList
        items={user.likedRecipes.map((recipe: Recipe) => recipe)}
        totalPages={1}
        currentPage={1}
        handlePageChange={() => {}}
        fetchData={fetchData}
      />
    </div>
  );
};

export default SavedRecipes;
