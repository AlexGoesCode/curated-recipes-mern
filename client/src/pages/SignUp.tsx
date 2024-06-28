import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setError, error } = useAuth(); // Get error handling from context

  const handleSignUp = async () => {
    console.log('username :>> ', username, password);
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    // Implement your sign-up logic here, e.g., call an API to register the user
    console.log(
      `Signing up with username: ${username} and password: ${password}`
    );

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    //! Modify this function according to Postman code:
    // instead of urlenconded (which it si a URLSearchParams variable), we need to us a FormData object.
    //then append the fields to the FormData object, and do not forget to append the avatar .
    const urlencoded = new URLSearchParams();
    // urlencoded.append('name', username);
    urlencoded.append('email', email);
    urlencoded.append('password', password);
    urlencoded.append('name', username);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };
    try {
      const response = await fetch(
        'http://localhost:5022/api/user/register',
        requestOptions
      );
      //do some error handling here : if response.ok is not Ok
      //if repsonse.ok is  true then we transform the response to json
      const result = await response.json();
      console.log('result :>> ', result);
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  const handleFileChange = (e) => {};
  return (
    <AuthLayout
      title='Sign up for an account'
      buttonText='Sign up'
      onButtonClick={handleSignUp}
    >
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium leading-6 text-gray-100'
        >
          User Name
        </label>
        <div className='mt-2'>
          <input
            id='username'
            name='username'
            type='text'
            autoComplete='username'
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
          />
        </div>
        <label
          htmlFor='username'
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
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
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
        </div>
        <div className='mt-2'>
          <input
            id='password'
            name='password'
            type='password'
            autoComplete='new-password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
          />
        </div>
        <div className='mt-2'>
          <input
            id='file'
            name='file'
            type='file'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            onChange={handleFileChange}
          />
        </div>
      </div>

      <div>
        <div className='flex items-center justify-between'>
          <label
            htmlFor='confirm-password'
            className='block text-sm font-medium leading-6 text-gray-100'
          >
            Confirm Password
          </label>
        </div>
        <div className='mt-2'>
          <input
            id='confirm-password'
            name='confirm-password'
            type='password'
            autoComplete='new-password'
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
          />
        </div>
      </div>

      {error && <div className='text-red-500 text-sm'>{error}</div>}
    </AuthLayout>
  );
};

export default SignUp;
