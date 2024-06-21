import { useContext, useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext'; // Ensure this path is correct

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, setError, error } = useAuth();

  const handleLogin = async () => {
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    login(username, password);
  };

  return (
    <AuthLayout
      title='Sign in to your account'
      buttonText='Sign in'
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
            className='block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      {error && <div className='text-red-500 text-sm'>{error}</div>}
    </AuthLayout>
  );
};

export default Login;
