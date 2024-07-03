import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { LoginAndSignUpResponse, UserType } from '../types/Types';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setError: (error: string) => void;
  error: string | null;
  avatarUrl: string;
  updateUserAvatar: (url: string) => void;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState('');

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
        const result = (await response.json()) as LoginAndSignUpResponse;
        console.log('result :>> ', result);
        if (!result.token) {
          alert('you need to login first');
          return;
        }
        if (result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          setUser(result.user);
          setAvatarUrl(result.user.avatar);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.log('error :>> ', error);
    }

    setError(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Logging out...');
    setIsAuthenticated(false);
    setUser(null);
    setAvatarUrl('');
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      setIsAuthenticated(true);
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAvatarUrl(parsedUser.avatar);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const updateUserAvatar = (url: string) => {
    setAvatarUrl(url);
    if (user) {
      const updatedUser = { ...user, avatar: url };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
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
        token: localStorage.getItem('token'),
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
