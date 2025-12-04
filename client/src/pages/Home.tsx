const Home = () => {
  return (
    <div className='relative inset-0 z-10 flex items-center justify-center'>
      <div className='bg-gray-900 bg-opacity-60 max-w-2xl h-auto p-10 mt-40 border rounded-2xl shadow-lg text-center'>
        <h1 className='text-2xl font-bold mb-4 text-gray-100'>
          Welcome to Curated Recipes Database
        </h1>
        <p className='mt-4 text-xl text-gray-100'>
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
