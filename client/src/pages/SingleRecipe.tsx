import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe, SingleRecipeOkResponse } from '../types/Types';

function SingleRecipe() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { recipeid } = useParams<{ recipeid: string }>();

  const fetchRecipe = async () => {
    const url = `http://localhost:5022/api/curated-recipes/${recipeid}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = (await response.json()) as SingleRecipeOkResponse;
      if (result.error) {
        throw new Error(result.message);
      }
      setRecipe(result.data);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    if (recipeid) {
      fetchRecipe();
    }
  }, [recipeid]);

  const handleLikeRecipe = async () => {
    const url = `http://localhost:5022/api/curated-recipes/${recipeid}/like`;
    try {
      const response = await fetch(url, {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Failed to like recipe');
      }

      const result = await response.json();
      console.log('Recipe liked', result);

      if (recipe) {
        setRecipe({ ...recipe, likes: result.likes });
      }
    } catch (error) {
      console.error('Error liking recipe:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  if (error) {
    return <div style={{ color: 'white' }}>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <main className='min-h-screen -mt-16 flex justify-center items-center bg-eggshell'>
      <article className='bg-white rounded-3xl w-1/2 flex flex-col md:flex-row'>
        <div className='md:w-1/2 flex justify-center items-center p-4'>
          <img
            src={recipe.imageUrl}
            alt={`Photo of ${recipe.name}`}
            className='max-w-full h-auto rounded-2xl'
          />
        </div>
        <div className='px-8 py-4 font-outfit text-wenge-brown md:w-1/2'>
          <h1 className='font-fancy text-3xl mt-8 text-dark-charcoal'>
            {recipe.name}
          </h1>
          <p className='mt-6'>Origin: {recipe.origin}</p>
          <p className='mt-6'>Diet: {recipe.diet}</p>
          <article className='bg-rose-white mt-6 p-5 rounded-xl'>
            <h2 className='text-dark-raspberry text-xl ml-2'>Difficulty</h2>
            <p className='ml-8 text-lg'>{recipe.difficulty}</p>
            <div className='w-full h-px bg-light-gray mx-auto mt-3'></div>
            <h2 className='text-dark-raspberry text-xl ml-2 mt-6'>Likes</h2>
            <div className='ml-8 flex items-center text-lg'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='red'
                className='w-6 h-6 mr-2'
                onClick={handleLikeRecipe} // Add onClick handler for liking the recipe
              >
                <path
                  fillRule='evenodd'
                  d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                  clipRule='evenodd'
                />
              </svg>
              {recipe.likes}
            </div>
          </article>
          <div className='mt-8'>
            <h3 className='font-fancy text-2xl text-nutmeg'>Ingredients</h3>
            <ul className='list-disc marker:text-nutmeg mt-4 ml-6 text-wenge-brown marker:align-middle'>
              {recipe.ingredients.map((ingredient, index) => (
                <li className='pl-4 mt-2' key={index}>
                  {ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div className='w-full h-px bg-light-gray mx-auto mt-8'></div>
          <div className='mt-8'>
            <h3 className='font-fancy text-2xl text-nutmeg'>Instructions</h3>
            <p className='mt-4 ml-6'>{recipe.instructions}</p>
          </div>
        </div>
      </article>
    </main>
  );
}

export default SingleRecipe;
