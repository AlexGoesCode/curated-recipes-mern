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
    console.log(`Logging in with username: ${email} and password: ${password}`);

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
      setIsLoading(true); // Line 35: Set loading state to true
      const response = await fetch(`${baseUrl}/api/user/login`, requestOptions);
      if (!response.ok) throw new Error('Failed to login');

      const result = (await response.json()) as LoginAndSignUpResponse;
      console.log('result :>> ', result);
      if (!result.token) {
        alert('You need to login first');
        return;
      }
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', JSON.stringify(result.user));
      setUser(result.user);
      setIsAuthenticated(true);
      navigate('/recipes'); // Redirect to recipes after login
    } catch (error) {
      console.log('error :>> ', error);
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false); // Line 56: Set loading state to false
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Logging out...');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login'); // Redirect to login after logout
  };

  const getUserProfile = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    try {
      setIsLoading(true); // Line 82: Set loading state to true
      const response = await fetch(
        `${baseUrl}/api/user/profile`,
        requestOptions
      );
      if (!response.ok && response.status === 401) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
        return;
      }
      const result = (await response.json()) as GetProfileOkResponse;
      console.log('result profile', result);
      setUser(result.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('error getting profile :>> ', error);
      setError('Failed to fetch user profile.');
    } finally {
      setIsLoading(false); // Line 101: Set loading state to false
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      getUserProfile();
    } else {
      setIsAuthenticated(false);
      setIsLoading(false); // Line 111: Set loading state to false if no token
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
