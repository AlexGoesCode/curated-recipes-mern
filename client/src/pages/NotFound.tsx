import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found-container'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to='/' className='home-link'>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
