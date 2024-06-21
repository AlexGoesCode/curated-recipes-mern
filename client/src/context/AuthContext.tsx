import { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => void;
  logout: () => void;
  setError: (error: string) => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Start with false for login
  const [error, setError] = useState<string | null>(null); // Add error state

  const login = (username: string, password: string) => {
    // Implement your login logic here
    console.log(
      `Logging in with username: ${username} and password: ${password}`
    );
    setIsAuthenticated(true); // Update based on your logic
    setError(null); // Clear any previous errors
  };

  const logout = () => {
    setIsAuthenticated(false);
    console.log('Logging out...');
  };

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
