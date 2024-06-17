import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    onSearch(searchTerm);
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  return (
    <form className='max-w-lg mx-auto' onSubmit={handleSubmit}>
      <div className='flex'>
        <div className='flex-grow'>
          <label
            htmlFor='search-dropdown'
            className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
          >
            Your Email
          </label>
          <button
            id='dropdown-button'
            data-dropdown-toggle='dropdown'
            className='w-3/5 self-center flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600'
            type='button'
          >
            All categories{' '}
            <svg
              className='w-2.5 h-2.5 ms-2.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 4 4 4-4'
              />
            </svg>
          </button>
          <div className='relative w-full'>
            <input
              type='search'
              id='search-dropdown'
              onChange={handleInputChange}
              className='block p-2.5 w-3/5 z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500'
              placeholder='Search Mockups, Logos, Design Templates...'
              required
            />
            <button
              type='submit'
              className='w-3/5 self-center absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
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
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
