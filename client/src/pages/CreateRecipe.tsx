import { useState } from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';

const CreateRecipe = () => {
  const [name, setName] = useState('');
  const [origin, setOrigin] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setInstructions] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [imageUrl, setImageUrl] = useState('');
  const { setError, error } = useAuth();
  const navigate: NavigateFunction = useNavigate();

  const handleIngredientChange = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:5022/api/curated-recipes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            origin,
            ingredients,
            instructions,
            difficulty,
            imageUrl,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to create recipe');
      }

      // Redirect to the recipe list page or show a success message
      navigate('/recipes');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <AuthLayout
      title='Create a New Recipe'
      buttonText='Create Recipe'
      onButtonClick={handleSubmit}
      showSignupLink={false} // Add this prop to hide the "Not a member?" link
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className='block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            />
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
            {ingredients.map((ingredient, index) => (
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
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
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
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
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
            htmlFor='imageUrl'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Image URL
          </label>
          <div className='mt-2'>
            <input
              id='imageUrl'
              name='imageUrl'
              type='text'
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className='block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        {error && <div className='text-red-500 text-sm'>{error}</div>}
      </div>
    </AuthLayout>
  );
};

export default CreateRecipe;
