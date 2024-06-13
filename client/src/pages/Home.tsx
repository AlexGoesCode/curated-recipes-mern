import { useContext } from 'react';
// import { AuthContext, useAuth } from '../../context/AuthContext';

const Home = () => {
  // const { user } = useAuth();
  // const { user } = useContext(AuthContext);

  return (
    <div className='p-4'>
      <h1>Welcome to My Website</h1>
      <p className='mt-4'>This is the content of the page.</p>
    </div>
  );
};

export default Home;
