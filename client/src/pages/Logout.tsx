import AuthLayout from '../components/AuthLayout';

const Logout = () => {
  const handleLogout = () => {
    // Handle logout logic
    console.log('Logging out...');
  };

  return (
    <AuthLayout title='Logout' buttonText='Logout' onButtonClick={handleLogout}>
      <p className='text-center'>Are you sure you want to logout?</p>
    </AuthLayout>
  );
};

export default Logout;
