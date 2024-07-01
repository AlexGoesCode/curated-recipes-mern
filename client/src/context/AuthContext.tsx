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
  avatarUrl: string; // Add avatarUrl to the context type
  updateUserAvatar: (url: string) => void; // Add updateUserAvatar to the context type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState(''); // Add avatarUrl state

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
      const response = await fetch(
        'http://localhost:5022/api/user/login',
        requestOptions
      );
      if (!response.ok) throw new Error('Failed to login');

      if (response.ok) {
        const result = (await response.json()) as LoginResponse;
        console.log('result :>> ', result);
        if (!result.token) {
          alert('you need to login first');
          return;
        }
        if (result.token) {
          localStorage.setItem('token', result.token);
          setUser(result.user);
          setAvatarUrl(result.user.avatar);
        }
      }
    } catch (error) {
      console.log('error :>> ', error);
    }

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

  const updateUserAvatar = (url: string) => {
    setAvatarUrl(url);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setError,
        error,
        avatarUrl,
        updateUserAvatar,
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
