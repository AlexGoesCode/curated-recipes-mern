import React from 'react';

interface AuthLayoutProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: React.ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100'>
            {props.title} {/* Use title prop here */}
          </h2>
        </div>

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-6'
            onSubmit={(e) => {
              e.preventDefault();
              props.onButtonClick();
            }}
          >
            {props.children}

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {props.buttonText} {/* Use buttonText prop here */}
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm text-gray-100 hover:text-orange-300'>
            Not a member?{' '}
            <a
              href='./signup'
              className='font-semibold leading-6 text-gray-100 hover:text-gray-200'
            ></a>
          </p>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
