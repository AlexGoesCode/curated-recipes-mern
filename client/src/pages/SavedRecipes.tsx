import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Recipe } from '../types/Types';
import GridList from '../components/GridList';
import { useAuth } from '../context/AuthContext';

const SavedRecipes = () => {
  const { user } = useAuth();
  console.log('user.likedRecipes :>> ', user.likedRecipes);

  // check if user is null and return an alternative UI or null
  if (!user) {
    return <div>Please log in to see saved recipes</div>;
  }

  const fetchData = (page: number) => {
    // create Logic to fetch data based on the page number or other parameters:
    fetch(
      `http://localhost:5022/api/curated-recipes/recipesbyid?userId=${user.id}&page=${page}`
    );

    console.log(`Fetching data for page ${page}`);
    // Update state or perform actions based on fetched data
  };

  return (
    <div>
      <h1 className='text-center text-3xl my-4'>Saved Recipes</h1>
      <GridList
        items={user.likedRecipes.map((recipe: Recipe) => recipe)}
        // Pass likedRecipes prop (add logic if needed)
        totalPages={1}
        currentPage={1}
        handlePageChange={() => {}}
        fetchData={fetchData} // Pass fetchData function
      />
    </div>
  );
};

export default SavedRecipes;
