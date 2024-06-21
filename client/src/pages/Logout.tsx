import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';

const Logout = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    console.log('Logging out...');
  };

  return (
    <AuthLayout title='Logout' buttonText='Logout' onButtonClick={handleLogout}>
      <p className='text-center'>Are you sure you want to logout?</p>
    </AuthLayout>
  );
};

export default Logout;
