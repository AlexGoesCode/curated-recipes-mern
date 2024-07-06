import { useContext } from 'react';
// import { AuthContext, useAuth } from '../../context/AuthContext';

const Home = () => {
  // const { user } = useAuth();
  // const { user } = useContext(AuthContext);

  return (
    <div className='relative inset-0 z-10 flex items-center justify-center'>
      <div className='bg-white max-w-2xl h-auto p-10 mt-40 rounded-2xl shadow-lg text-center'>
        <h1 className='text-2xl font-bold mb-4'>
          Welcome to Curated Recipes Database
        </h1>
        <p className='mt-4 text-xl'>
          Our curated database features an extensive collection of recipes
          spanning various cuisines, dietary preferences, and skill levels.
          Whether you are a novice cook or a seasoned chef, you'll find
          inspiration and guidance to create mouth-watering dishes that impress.
        </p>
      </div>
    </div>
  );
};

export default Home;
