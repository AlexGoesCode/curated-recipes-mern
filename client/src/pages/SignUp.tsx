import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { LoginAndSignUpResponse } from '../types/Types';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarName, setAvatarName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setError, error, updateUserAvatar } = useAuth(); // Get error handling from context

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setAvatar(file);
      setAvatarName(file.name); // Step 2: Update the file name state
    }
  };

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
    console.log(
      `Signing up with username: ${username} and password: ${password}`
    );

    const formdata = new FormData();
    formdata.append('email', email);
    formdata.append('password', password);
    formdata.append('name', username);
    if (avatar) {
      formdata.append('avatar', avatar);
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formdata,
      // headers: myHeaders,
      redirect: 'follow', //,as RequestRedirect,
    };
    //
    try {
      const response = await fetch(
        'http://localhost:5022/api/user/register',
        requestOptions
      );
      if (!response.ok) {
        const errorResult = await response.json();
        setError(errorResult.message || 'An error occurred.');
        return;
      }
      const result = (await response.json()) as LoginAndSignUpResponse;
      console.log('result :>> ', result);
      //! redirect to Login page

      // Assuming the server responds with the user's avatar URL
      if (result.user.avatar) {
        updateUserAvatar(result.user.avatar); // Call a function to update the avatar in the navbar
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred during sign-up.');
    }
  };

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
            className='block w-full rounded-md border-0 py-1.5 text-gray-100 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-orange-400 sm:text-sm sm:leading-6'
            onChange={handleFileChange}
          />
          {avatarName && <p>{avatarName} uploaded</p>}
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
