import { useContext } from 'react';
// import { AuthContext, useAuth } from '../../context/AuthContext';

const Home = () => {
  // const { user } = useAuth();
  // const { user } = useContext(AuthContext);

  return (
    <div className='relative inset-0 z-10 flex items-center justify-center'>
      <div className='bg-white max-w-sm p-10 mt-64 rounded-lg shadow-lg text-center'>
        <h1 className='text-2xl font-bold mb-4'>Welcome to My Website</h1>
        <p className='mt-4'>This is the content of the page.</p>
      </div>
    </div>
  );
};

export default Home;
