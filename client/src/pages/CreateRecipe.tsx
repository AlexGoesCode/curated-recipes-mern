import { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { Recipe } from '../types/Types';

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState<Recipe>({
    _id: '',
    name: '',
    origin: '',
    diet: 'none',
    difficulty: 'easy',
    picture: '',
    ingredients: [''],
    instructions: '',
    likes: [],
  });

  const { setError, error } = useAuth();
  const navigate: NavigateFunction = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null); // STATE FOR IMAGE FILE

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ''] });
  };

  const removeIngredient = (index: number) => {
    const newIngredients = recipe.ingredients.filter((_, i) => i !== index);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;

    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('origin', recipe.origin);
    formData.append('ingredients', 'bacon, pecorino');
    formData.append('instructions', 'dont use cream');
    formData.append('diet', 'Vegan');
    formData.append('difficulty', 'Easy');
    formData.append('image', imageFile);

    try {
      const response = await fetch('http://localhost:5022/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      setRecipe({ ...recipe, picture: result.imageUrl });
    } catch (err) {
      const error = err as Error;
      console.error('Error occurred during image upload', error);
      setError(error.message);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const recipeData = {
      ...recipe,
    };

    console.log('Submitting recipe:', recipeData);

    try {
      const response = await fetch(
        'http://localhost:5022/api/curated-recipes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(recipeData),
        }
      );

      console.log('Response received', response);

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      const result = await response.json();
      console.log('Recipe created', result);

      navigate('/recipes');
    } catch (err) {
      const error = err as Error;
      console.error('Error occurred', error);
      setError(error.message);
    }
  };

  return (
    <AuthLayout
      title='Create a New Recipe'
      buttonText='Create Recipe'
      onButtonClick={handleSubmit}
      showSignupLink={false}
    >
      <div className='space-y-2 -mt-5'>
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Recipe Name
          </label>
          <div className='mt-2'>
            <input
              id='name'
              name='name'
              type='text'
              required
              value={recipe.name}
              onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
              className='block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='origin'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Country of Origin
          </label>
          <div className='mt-2'>
            <input
              id='origin'
              name='origin'
              type='text'
              required
              value={recipe.origin}
              onChange={(e) => setRecipe({ ...recipe, origin: e.target.value })}
              className='block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='diet'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Diet Type
          </label>
          <div className='mt-2'>
            <select
              id='diet'
              name='diet'
              required
              value={recipe.diet}
              onChange={(e) =>
                setRecipe({ ...recipe, diet: e.target.value as Recipe['diet'] })
              }
              className='block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            >
              <option value='none'>None</option>
              <option value='vegetarian'>Vegetarian</option>
              <option value='vegan'>Vegan</option>
              <option value='gluten-free'>Gluten-Free</option>
              <option value='dairy-free'>Dairy-Free</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor='ingredients'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Ingredients
          </label>
          <div className='mt-2 space-y-2'>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className='flex items-center space-x-2'>
                <input
                  type='text'
                  value={ingredient}
                  onChange={(e) =>
                    handleIngredientChange(index, e.target.value)
                  }
                  className='flex-1 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                />
                <button
                  type='button'
                  onClick={() => removeIngredient(index)}
                  className='rounded-md bg-red-600 px-2 py-1 text-gray-100'
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={addIngredient}
              className='rounded-md bg-green-600 px-2 py-1 text-white'
            >
              Add Ingredient
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor='instructions'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Instructions
          </label>
          <div className='mt-2'>
            <textarea
              id='instructions'
              name='instructions'
              rows={4}
              required
              value={recipe.instructions}
              onChange={(e) =>
                setRecipe({ ...recipe, instructions: e.target.value })
              }
              className='block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        <div>
          <label
            htmlFor='difficulty'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Difficulty
          </label>
          <div className='mt-2'>
            <select
              id='difficulty'
              name='difficulty'
              required
              value={recipe.difficulty}
              onChange={(e) =>
                setRecipe({
                  ...recipe,
                  difficulty: e.target.value as Recipe['difficulty'],
                })
              }
              className='block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
        </div>

        <div>
          <label
            htmlFor='picture'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Image URL
          </label>
          <div className='mt-2 flex items-center space-x-2'>
            <input
              id='picture'
              name='picture'
              type='text'
              required
              value={recipe.picture}
              onChange={(e) =>
                setRecipe({ ...recipe, picture: e.target.value })
              }
              className='flex-1 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              className='hidden'
              id='fileInput'
            />
            <button
              type='button'
              onClick={() => document.getElementById('fileInput')?.click()}
              className='rounded-md bg-blue-600 px-2 py-1 text-white'
            >
              Choose File
            </button>
            <button
              type='button'
              onClick={handleImageUpload}
              className='rounded-md bg-green-600 px-2 py-1 text-white'
            >
              Upload
            </button>
          </div>
        </div>

        {error && <div className='text-red-500 text-sm'>{error}</div>}
      </div>
    </AuthLayout>
  );
};

export default CreateRecipe;
