import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  GetProfileOkResponse,
  LoginAndSignUpResponse,
  UserType,
} from '../types/Types';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../config';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setError: (error: string) => void;
  error: string | null;
  user: UserType | null;
  getUserProfile: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    console.log(`Logging in with email: ${email} and password: ${password}`);

    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('email', email);
    urlencoded.append('password', password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(`${baseUrl}/api/user/login`, requestOptions);
      if (!response.ok) throw new Error('Failed to login');

      const result = (await response.json()) as LoginAndSignUpResponse;
      console.log('result :>> ', result);

      if (result.token) {
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        setUser(result.user);
        setIsAuthenticated(true);
        setIsLoading(false);
        navigate('/recipes');
      } else {
        alert('Login failed, please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Failed to login');
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login'); // Redirect to login after logout
  };

  const getUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setUser(null);
      navigate('/login');
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${token}`);

    try {
      const response = await fetch(`${baseUrl}/api/user/profile`, {
        method: 'GET',
        headers: myHeaders,
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid or expired
          logout();
        }
        return;
      }

      const result = (await response.json()) as GetProfileOkResponse;
      setUser(result.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setError,
        error,
        user,
        getUserProfile,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
