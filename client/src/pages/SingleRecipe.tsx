import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Recipe, SingleRecipeOkResponse } from '../types/Types';

function SingleRecipe() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState(null);
  const urlParameter = useParams();

  console.log('recipeid :>> ', urlParameter.recipeid);

  // build a fetch function that makes a request to the backend enpoint, including urlParemeter.recipeid
  const fetchRecipe = async () => {
    const url = `http://localhost:5022/api/curated-recipes/${urlParameter.recipeid}`;
    console.log('url :>> ', url);
    try {
      const response = await fetch(url);
      console.log('response :>> ', response);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = (await response.json()) as SingleRecipeOkResponse;
      setRecipe(result.data);
      console.log('result :>> ', result);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchRecipe();
  }, []);

  if (error) {
    return <div style={{ color: 'white' }}>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className='md:container absolute max-w-l text-center text-white bg-gray-500 font h-96 w-20 md:mx-auto'>
      <h1>Recipe:{recipe?._id} </h1>
      <p>name:{recipe?.name}</p>
      <p>country:{recipe?.origin}</p>
      {/* // below we do conditional rendering (show us the right part of the &&
      only if the left part is true). Does the same thing as the code above. */}
      {/* {recipe && (
        <>
          <h1>Recipe:{recipe._id} </h1>
          <p>name:{recipe.name}</p>
          <p>country:{recipe.origin}</p>
        </>
      )} */}
    </div>
  );
}

export default SingleRecipe;
