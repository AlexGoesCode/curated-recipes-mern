import { createContext, useContext, useState } from 'react';

// Define the AuthContextType interface with the following properties:
interface AuthContextType {
  isAuthenticated: boolean;
  logout: () => void;
}

// Create the AuthContext context with the AuthContextType interface as the type argument.
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the AuthProvider component with the following properties (do not use ever React.FC):
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Create a logout function that sets isAuthenticated to false.
  const logout = () => {
    setIsAuthenticated(false);
    console.log('Logging out...');
  };

  // Return the AuthContext.Provider component with the value prop set to an object
  // with the isAuthenticated and logout properties.
  return (
    <AuthContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Define the useAuth hook that returns the AuthContext context.
export const useAuth = () => {
  const context = useContext(AuthContext);
  // Throw an error if the useAuth hook is used outside of an AuthProvider component.
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
