import { useState } from 'react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header>
      <nav className='flex h-auto w-auto bg-white shadow-lg rounded-lg justify-between md:h-16'>
        <div className='flex w-full justify-between '>
          <div
            className={`${
              open ? 'hidden' : 'flex'
            } flex px-6 w-1/2 items-center font-semibold md:w-1/5 md:px-1 md:flex md:items-center md:justify-center`}
            x-transition:enter='transition ease-out duration-300'
          >
            <a href='#'>Flavours:Dance!</a>
          </div>

          <div
            className={`flex flex-col w-full h-auto md:hidden ${
              open ? 'block' : 'hidden'
            }`}
            x-transition:enter='transition ease-in-out duration-300'
          >
            <div className='flex flex-col items-center justify-center gap-2'>
              <a href='#'>Home</a>
              <a href='#'>About Us</a>
              <a href='#'>Products</a>
              <a href='#'>Contact</a>
              <button>Login</button>
              <button>Sign Up</button>
            </div>
          </div>
          <div className='hidden w-3/5 items-center justify-evenly font-semibold md:flex'>
            <a href='#'>Home</a>
            <a href='#'>About Us</a>
            <a href='#'>Products</a>
            <a href='#'>Contact</a>
          </div>
          <div className='hidden w-1/5 items-center justify-evenly font-semibold md:flex'>
            <button>Login</button>
            <button>Sign Up</button>
          </div>
          <button
            className='text-gray-500 w-10 h-10 relative focus:outline-none bg-white md:hidden'
            onClick={() => setOpen(!open)}
          >
            <span className='sr-only'>Open main menu</span>
            <div className='block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2'>
              <span
                aria-hidden='true'
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  open ? 'rotate-45' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                aria-hidden='true'
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  open ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                aria-hidden='true'
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  open ? '-rotate-45' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
