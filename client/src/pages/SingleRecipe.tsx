import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe, SingleRecipeOkResponse } from '../types/Types';
import { baseUrl } from '../config';

function SingleRecipe() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { recipeid } = useParams<{ recipeid: string }>();
  const navigate = useNavigate();

  const fetchRecipe = async () => {
    const url = `${baseUrl}/api/curated-recipes/${recipeid}`;
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
    const url = `${baseUrl}/api/curated-recipes/${recipeid}/like`;
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

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  if (error) {
    return <div style={{ color: 'white' }}>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <main className='z-10 h-screen sm:-my-20 flex justify-center items-center bg-eggshell text-gray-100'>
      <article className='p-3 bg-gray-900 bg-opacity-70 border rounded-3xl max-h-full max-w-5xl h-full w-full md:h-auto md:w-auto flex flex-col md:flex-row overflow-y-auto'>
        <div className='md:w-1/2 flex justify-center items-center p-2'>
          <div className='w-full'>
            <img
              src={recipe.picture}
              alt={`Photo of ${recipe.name}`}
              className='max-h-screen w-96 object-cover rounded-2xl'
              style={{ aspectRatio: '3 / 4' }}
            />
          </div>
        </div>
        <div className='relative px-4 py-2 font-outfit text-wenge-brown md:w-1/2'>
          <div className='flex justify-between items-center mt-2 mb-10 sm:mb-12'>
            <h1 className='font-fancy text-3xl text-dark-charcoal'>
              {recipe.name}
            </h1>
            <button
              className='w-24 bg-orange-400 p-3 text-lg font-medium rounded-full'
              onClick={handleBack}
            >
              Back
            </button>
          </div>
          <div className='flex justify-between mb-8 '>
            <div className='w-1/2 pr-2'>
              <h2 className='text-xl'>Origin:</h2>
              <p className='text-lg ml-4'>{recipe.origin}</p>
            </div>
            <div className='w-1/2 pl-2'>
              <h2 className='text-xl'>Diet:</h2>
              <p className='text-lg ml-4'>{recipe.diet}</p>
            </div>
          </div>
          <div className='flex justify-between mb-8'>
            <div className='w-1/2 pr-2'>
              <h2 className='text-dark-raspberry text-xl'>Difficulty:</h2>
              <p className='ml-4 text-lg'>{recipe.difficulty}</p>
            </div>
            <div className='w-1/2 pl-2'>
              <h2 className='text-dark-raspberry text-xl'>Likes:</h2>
              <div className='ml-4 flex items-center text-lg'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                  fill='red'
                  className='w-5 h-5 mr-1'
                  onClick={handleLikeRecipe} // Add onClick handler for liking the recipe
                >
                  <path
                    fillRule='evenodd'
                    d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'
                    clipRule='evenodd'
                  />
                </svg>
                {recipe.likes.length}
              </div>
            </div>
          </div>
          <div className='flex mt-4'>
            <div className='w-1/2 pr-2'>
              <h2 className='font-fancy text-xl text-nutmeg'>Ingredients:</h2>
              <ul className='list-disc marker:text-nutmeg mt-2 ml-4 text-wenge-brown marker:align-middle max-h-40 overflow-y-auto'>
                {recipe.ingredients.map((ingredient, index) => (
                  <li className=' mt-1' key={index}>
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>
            <div className='w-1/2 pl-2'>
              <h2 className='font-fancy text-xl text-nutmeg'>Instructions:</h2>
              <p className='mt-2 ml-4 max-h-40 overflow-y-auto'>
                {recipe.instructions}
              </p>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}

export default SingleRecipe;
