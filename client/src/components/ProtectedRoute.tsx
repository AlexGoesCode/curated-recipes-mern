import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// ProtectedRoute component that will redirect to login if user is not authenticated.
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const {} = useAuth();

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children ? <>{children}</> : <Outlet />;

  export default ProtectedRoute;
};
