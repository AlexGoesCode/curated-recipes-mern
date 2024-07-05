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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false); //* NEW

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

  const handleSubmit = async () => {
    console.log(
      'typeof recipe.ingredients :>> ',
      recipe.ingredients instanceof Array
    );
    console.log(' recipe.ingredients :>> ', recipe.ingredients);

    if (!imageFile) return alert('You need to select an image'); //*

    setIsUploading(true); //*
    console.log('recipe :>> ', recipe);
    console.log('picture :>> ', imageFile);
    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('origin', recipe.origin);
    formData.append('ingredients', recipe.ingredients.join(','));
    formData.append('instructions', recipe.instructions);
    formData.append('diet', recipe.diet);
    formData.append('difficulty', recipe.difficulty);
    formData.append('picture', imageFile);

    try {
      const response = await fetch(
        'http://localhost:5022/api/curated-recipes/new-recipe',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      // setRecipe({ ...recipe, picture: result.imageUrl });
      setIsUploading(false); //* NEW
      alert('Recipe created successfully');
    } catch (err) {
      const error = err as Error;
      console.error('Error occurred during image upload', error);
      setError(error.message);
      setIsUploading(false); //* NEW
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
            htmlFor='picture'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Image URL
          </label>
          <div className='mt-2 flex items-center space-x-2'>
            {/* <label
              // htmlFor='fileInput'
              className='rounded-md bg-blue-600 px-2 py-1 text-red'
              style={{
                border: '1px solid #ccc',
                display: 'inline-block',
                padding: '6px 12px',
                cursor: 'pointer',
              }}
            > */}
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              // className='none'
              id='fileInput'
              name='fileInput'
              // style={{ display: 'none' }}
            />
            {/* Upload a picture
            </label> */}
          </div>
          {console.log('isUploading', isUploading)}
          {isUploading && (
            <div
              className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]'
              role='status'
            >
              <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                Loading...
              </span>
            </div>
          )}
        </div>

        {error && <div className='text-red-500 text-sm'>{error}</div>}
      </div>
    </AuthLayout>
  );
};

export default CreateRecipe;
