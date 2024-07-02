import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// ProtectedRoute component that will redirect to login if user is not authenticated.
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token } = useAuth(); // Assuming [`useAuth`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2FUsers%2Falex%2Freact-app%2Fflavours-dance%2Fclient%2Fsrc%2Fcontext%2FAuthContext.tsx%22%2C%22external%22%3A%22file%3A%2F%2F%2FUsers%2Falex%2Freact-app%2Fflavours-dance%2Fclient%2Fsrc%2Fcontext%2FAuthContext.tsx%22%2C%22path%22%3A%22%2FUsers%2Falex%2Freact-app%2Fflavours-dance%2Fclient%2Fsrc%2Fcontext%2FAuthContext.tsx%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A107%2C%22character%22%3A0%7D%5D "client/src/context/AuthContext.tsx") now also provides a token

  if (!token) {
    return <Navigate to='/login' />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
