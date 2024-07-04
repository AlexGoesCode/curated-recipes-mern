import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Types';
import GridList from '../components/GridList';
import { useAuth } from '../context/AuthContext';

const SavedRecipes = () => {
  const { user } = useAuth();
  // check if user is null and return an alternative UI or null
  if (!user) {
    return <div>Please log in to see saved recipes</div>;
  }

  console.log('user.likedRecipes :>> ', user.likedRecipes);

  // Adjust fetchData to match expected signature in GridListProps
  const fetchData = async () => {
    const page = 1; // Example fixed page number, adjust as needed
    try {
      const response = await fetch(
        `http://localhost:5022/api/curated-recipes/recipesbyid?userId=${user.id}&page=${page}`
      );
      const data = await response.json();
      console.log(`Fetched data for page ${page}:`, data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
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
