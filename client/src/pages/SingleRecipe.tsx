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

  if (error) {
    return <div style={{ color: 'white' }}>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <main className='min-h-screen -my-24 flex justify-center items-center bg-eggshell'>
      <article className='bg-white my-4 rounded-3xl w-1/2 flex flex-col md:flex-row'>
        <div className='md:w-1/2 flex justify-center items-center p-4'>
          <img
            src={recipe.imageUrl}
            alt={`Photo of ${recipe.name}`}
            className='max-w-full h-auto rounded-3xl'
          />
        </div>
        <div className='px-8 py-4 font-outfit text-wenge-brown md:w-1/2'>
          <h1 className='font-fancy text-4xl mt-8 text-dark-charcoal'>
            {recipe.name}
          </h1>
          <p className='mt-6'>Origin: {recipe.origin}</p>
          <article className='bg-rose-white mt-6 p-5 rounded-xl'>
            <h2 className='text-dark-raspberry text-xl font-semibold ml-2'>
              Difficulty
            </h2>
            <p className='ml-8 text-lg'>{recipe.difficulty}</p>
            <div className='w-full h-px bg-light-gray mx-auto mt-3'></div>
            <h2 className='text-dark-raspberry text-xl font-semibold ml-2 mt-6'>
              Likes
            </h2>
            <p className='ml-8 text-lg'>{recipe.likes}</p>
          </article>
          <div className='mt-8'>
            <h3 className='font-fancy text-3xl text-nutmeg'>Ingredients</h3>
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
            <h3 className='font-fancy text-3xl text-nutmeg'>Instructions</h3>
            <p className='mt-4 ml-6'>{recipe.instructions}</p>
          </div>
        </div>
      </article>
    </main>
  );
}

export default SingleRecipe;
