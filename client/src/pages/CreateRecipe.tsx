import { useState, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/AuthLayout';
import { Recipe } from '../types/Types';
import Select from 'react-select';
import { MultiValue } from 'react-select';
import { useForm, SubmitHandler } from 'react-hook-form';
import { baseUrl } from '../config';

const dietOptions = [
  { value: 'none', label: 'None' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'dairy-free', label: 'Dairy-Free' },
];

// Define action types for the reducer
type RecipeAction =
  | { type: 'SET_FIELD'; field: string; value: any }
  | { type: 'SET_INGREDIENT'; index: number; value: string }
  | { type: 'ADD_INGREDIENT' }
  | { type: 'REMOVE_INGREDIENT'; index: number };

// Reducer function for recipe state management
const recipeReducer = (state: Recipe, action: RecipeAction): Recipe => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_INGREDIENT':
      const newIngredients = [...state.ingredients];
      newIngredients[action.index] = action.value;
      return { ...state, ingredients: newIngredients };
    case 'ADD_INGREDIENT':
      return { ...state, ingredients: [...state.ingredients, ''] };
    case 'REMOVE_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.filter((_, i) => i !== action.index),
      };
    default:
      return state;
  }
};

const CreateRecipe = () => {
  const [recipe, dispatch] = useReducer(recipeReducer, {
    _id: '',
    name: '',
    origin: '',
    diet: [],
    difficulty: 'easy',
    picture: '',
    ingredients: [''],
    instructions: '',
    likes: [],
  });

  const { setError, error } = useAuth();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Recipe>();

  const handleDietChange = (
    selectedOptions: MultiValue<{ value: string; label: string }>
  ) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    dispatch({ type: 'SET_FIELD', field: 'diet', value: selectedValues });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const isFormReadyToSubmit = () => {
    // Check if all required fields are filled
    const hasName = recipe.name.trim() !== '';
    const hasOrigin = recipe.origin.trim() !== '';
    const hasInstructions = recipe.instructions.trim() !== '';

    // Check if at least 3 ingredients have text
    const filledIngredients = recipe.ingredients.filter(
      (ingredient) => ingredient.trim() !== ''
    );
    const hasEnoughIngredients = filledIngredients.length >= 3;

    // Check if at least one diet option is selected
    const hasDietOption = recipe.diet.length > 0;

    // Check if an image is selected
    const hasImage = imageFile !== null;

    // Return true only if all conditions are met
    return (
      hasName &&
      hasOrigin &&
      hasInstructions &&
      hasEnoughIngredients &&
      hasDietOption &&
      hasImage
    );
  };

  const onSubmit: SubmitHandler<Recipe> = async () => {
    if (!imageFile) return alert('Please select an image.');

    const formData = new FormData();
    formData.append('name', recipe.name);
    formData.append('origin', recipe.origin);
    formData.append('ingredients', recipe.ingredients.join(','));
    formData.append('instructions', recipe.instructions);
    formData.append('diet', recipe.diet.join(','));
    formData.append('difficulty', recipe.difficulty);
    formData.append('picture', imageFile);

    setIsUploading(true);

    try {
      const response = await fetch(
        `${baseUrl}/api/curated-recipes/new-recipe`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) throw new Error('Failed to upload recipe');

      setIsUploading(false);
      alert('Recipe created successfully');
      navigate('/recipes');
    } catch (err) {
      setError((err as Error).message);
      setIsUploading(false);
    }
  };

  return (
    <AuthLayout
      title='Create Recipe'
      buttonText='Submit'
      onButtonClick={handleSubmit(onSubmit)}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4 h-96 overflow-y-auto -mt-2'
      >
        {/* Recipe Name */}
        <div>
          <label
            htmlFor='name'
            className='block text-md font-medium leading-6 text-gray-100'
          >
            Recipe Name
          </label>
          <div className='mt-2'>
            <input
              id='name'
              {...register('name', { required: true })}
              value={recipe.name}
              placeholder='enter recipe name'
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'name',
                  value: e.target.value,
                })
              }
              className='block w-4/5 rounded-md border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            />
            {errors.name && (
              <span className='text-red-500 text-sm'>Name is required</span>
            )}
          </div>
        </div>

        {/* Country of Origin */}
        <div>
          <label
            htmlFor='origin'
            className='block text-md font-medium leading-6 text-gray-100'
          >
            Country of Origin
          </label>
          <div className='mt-2'>
            <input
              id='origin'
              {...register('origin', { required: true })}
              value={recipe.origin}
              placeholder='enter the country of origin'
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'origin',
                  value: e.target.value,
                })
              }
              className='block w-4/5 rounded-md border-0 py-1 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            />
            {errors.origin && (
              <span className='text-red-500 text-sm'>Origin is required</span>
            )}
          </div>
        </div>

        {/* Diet Type */}
        <div>
          <label
            htmlFor='diet'
            className='block text-md font-medium leading-6 text-gray-100'
          >
            Diet Type
          </label>
          <div className='mt-2'>
            <Select
              id='diet'
              isMulti
              options={dietOptions}
              value={dietOptions.filter((option) =>
                recipe.diet.includes(option.value as Recipe['diet'][number])
              )}
              onChange={handleDietChange}
              className='block w-4/5 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            />
          </div>
        </div>

        {/* Difficulty */}
        <div>
          <label
            htmlFor='difficulty'
            className='block text-md font-medium leading-6 text-gray-100'
          >
            Difficulty Level
          </label>
          <div className='mt-2'>
            <select
              id='difficulty'
              value={recipe.difficulty}
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'difficulty',
                  value: e.target.value,
                })
              }
              className='block w-4/5 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            >
              <option value='easy'>Easy</option>
              <option value='medium'>Medium</option>
              <option value='hard'>Hard</option>
            </select>
          </div>
        </div>

        {/* Ingredients */}
        <div>
          <label
            htmlFor='ingredients'
            className='block text-md font-medium leading-6 text-gray-100'
          >
            Ingredients
          </label>
          <div className='mt-2 space-y-2'>
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className='flex items-center space-x-2'>
                <input
                  type='text'
                  value={ingredient}
                  placeholder='add at least 3 ingredients'
                  onChange={(e) =>
                    dispatch({
                      type: 'SET_INGREDIENT',
                      index,
                      value: e.target.value,
                    })
                  }
                  className='flex-1 block w-full rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
                />
                <button
                  type='button'
                  onClick={() => dispatch({ type: 'REMOVE_INGREDIENT', index })}
                  className='rounded-md bg-red-600 px-1 py-1 text-gray-100'
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type='button'
              onClick={() => dispatch({ type: 'ADD_INGREDIENT' })}
              className='rounded-md text-sm bg-green-600 px-2 py-1 text-white'
            >
              Add ingredient
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div>
          <label
            htmlFor='instructions'
            className='block text-md font-medium leading-6 text-gray-100'
          >
            Instructions
          </label>
          <div className='mt-2'>
            <textarea
              id='instructions'
              {...register('instructions', { required: true })}
              value={recipe.instructions}
              placeholder='write some instructions'
              onChange={(e) =>
                dispatch({
                  type: 'SET_FIELD',
                  field: 'instructions',
                  value: e.target.value,
                })
              }
              rows={4}
              className='block w-4/5 rounded-md border-0 py-1 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            />
            {errors.instructions && (
              <span className='text-red-500 text-sm'>
                Instructions are required
              </span>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label
            htmlFor='picture'
            className='block text-md font-medium leading-6 text-gray-100'
          >
            Upload Image
          </label>
          <div className='mt-2 text-gray-400'>
            <input type='file' accept='image/*' onChange={handleImageChange} />
          </div>
        </div>

        {/* Status Box */}
        <div>
          {isUploading ? (
            <div className='text-orange-500 text-sm font-medium'>
              Uploading... Please wait
            </div>
          ) : isFormReadyToSubmit() ? (
            <div className='text-green-500 text-sm font-medium'>
              Ready to submit
            </div>
          ) : (
            <div className='text-red-500 text-sm font-medium'>
              Please complete the form before submitting
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </form>
    </AuthLayout>
  );
};

export default CreateRecipe;
