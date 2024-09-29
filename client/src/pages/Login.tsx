import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct
// import { Await, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, setError, error, isAuthenticated } = useAuth();

  const handleLogin = async () => {
    console.log('Login button clicked');
    console.log('Email:', email);
    console.log('Password:', password);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      console.log('Error: Password must be at least 6 characters long.');
      return;
    }

    try {
      await login(email, password);
      console.log('Login successful');
      alert('Login successful!');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };
  // const navigate = useNavigate();

  return (
    <AuthLayout
      title='Log-in to your account'
      buttonText='Log-in'
      onButtonClick={handleLogin}
    >
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium leading-6 text-gray-100'
        >
          Email address
        </label>
        <div className='mt-2'>
          <input
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Password
          </label>
          <div className='text-sm'>
            <a
              href='#'
              className='font-semibold text-gray-100 hover:text-orange-300'
            >
              Forgot password?
            </a>
          </div>
        </div>
        <div className='mt-2'>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='current-password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      {error && <div className='text-red-500 text-sm'>{error}</div>}
      {isAuthenticated && (
        <div className='text-gray-100 text-sm'>You are logged in</div>
      )}
    </AuthLayout>
  );
};

export default Login;
