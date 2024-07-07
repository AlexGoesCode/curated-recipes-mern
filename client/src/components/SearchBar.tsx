import React, { useState } from 'react';

interface SearchBarProps {
  handleSearch: () => void;
  setSearchTerm: (term: string) => void;
  setSearchBy: (option: 'name' | 'ingredients' | 'diet' | 'id') => void; // Add this prop with specific union type
}

function SearchBar({
  handleSearch,
  setSearchTerm,
  setSearchBy,
}: SearchBarProps) {
  const [term, setTerm] = useState('');
  const [searchOption, setSearchOption] = useState<
    'name' | 'ingredients' | 'diet' | 'id'
  >('name'); // Use a specific union type for searchOption

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    handleSearch();
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value);
    setSearchTerm(event.target.value);
  }

  function handleOptionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const selectedOption = event.target.value as
      | 'name'
      | 'ingredients'
      | 'diet'
      | 'id'; // Cast to specific union type
    setSearchOption(selectedOption);
    setSearchBy(selectedOption);
  }

  return (
    <form className='max-w-xl mx-auto my-8 relative' onSubmit={handleSubmit}>
      <div className='flex'>
        <select
          id='dropdown-button'
          className='z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600 relative'
          value={searchOption}
          onChange={handleOptionChange}
        >
          <option value='name'>Name</option>
          <option value='ingredients'>Ingredients</option>
          <option value='diet'>Diet</option>
          <option value='id'>ID</option>
        </select>
        <input
          type='search'
          id='search-dropdown'
          onChange={handleInputChange}
          className='relative block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 border-gray-300 rounded-r-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
          placeholder='Search...'
          required
        />
        <button
          type='submit'
          className='relative p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          <svg
            className='w-4 h-4'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
