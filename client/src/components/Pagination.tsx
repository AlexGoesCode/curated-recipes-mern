import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const getPaginationItems = () => {
    const items = [];
    const maxPageItems = 5;
    const halfPageItems = Math.floor(maxPageItems / 2);
    let startPage = Math.max(1, currentPage - halfPageItems);
    let endPage = Math.min(totalPages, currentPage + halfPageItems);

    if (currentPage - halfPageItems <= 0) {
      endPage = Math.min(
        totalPages,
        endPage + (halfPageItems - currentPage + 1)
      );
    }

    if (currentPage + halfPageItems > totalPages) {
      startPage = Math.max(
        1,
        startPage - (currentPage + halfPageItems - totalPages)
      );
    }

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <a
          key={number}
          href='#'
          className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
            number === currentPage
              ? 'z-10 bg-indigo-600 text-white'
              : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
          } focus:z-20 focus:outline-offset-0`}
          onClick={(e) => {
            e.preventDefault();
            onPageChange(number);
          }}
        >
          {number}
        </a>
      );
    }

    return items;
  };

  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        <a
          href='#'
          className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          onClick={(e) => {
            e.preventDefault();
            if (currentPage > 1) onPageChange(currentPage - 1);
          }}
        >
          Previous
        </a>
        <a
          href='#'
          className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          onClick={(e) => {
            e.preventDefault();
            if (currentPage < totalPages) onPageChange(currentPage + 1);
          }}
        >
          Next
        </a>
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm text-gray-700'>
            Showing{' '}
            <span className='font-medium'>{(currentPage - 1) * 10 + 1}</span> to{' '}
            <span className='font-medium'>
              {Math.min(currentPage * 10, totalPages * 10)}
            </span>{' '}
            of <span className='font-medium'>{totalPages * 10}</span> results
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            aria-label='Pagination'
          >
            <a
              href='#'
              className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
            >
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </a>
            {getPaginationItems()}
            <a
              href='#'
              className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
            >
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
