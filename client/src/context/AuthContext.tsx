import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { LoginResponse, UserType } from '../types/Types';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setError: (error: string) => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Start with false for login
  const [error, setError] = useState<string | null>(null); // Add error state

  const login = async (email: string, password: string) => {
    // Implement your login logic here
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
      const response = await fetch(
        'http://localhost:5022/api/user/login',
        requestOptions
      );
      if (!response.ok) throw new Error('Failed to login');

      if (response.ok) {
        const result = (await response.json()) as LoginResponse;
        console.log('result :>> ', result);
        //1. if login is successful, set token in local storage
        if (!result.token) {
          alert('you need to login first');
          return;
        }
        if (result.token) {
          localStorage.setItem('token', result.token);
          setUser(result.user);
        }
      }
    } catch (error) {
      console.log('error :>> ', error);
    }

    // setIsAuthenticated(true); // Update based on your logic
    setError(null); // Clear any previous errors
  };

  const logout = () => {
    localStorage.removeItem('token'); // Clear the token on logout
    console.log('Logging out...');
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [user?.email]);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, setError, error }}
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
