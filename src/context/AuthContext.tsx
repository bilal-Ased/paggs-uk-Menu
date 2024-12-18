import { CircularProgress } from '@mui/material';
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import Loader from '../common/Loader';

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user : any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Retrieve token from localStorage

        // Check if the token exists before making the request
        if (token) {
          const response = await fetch('https://coral-app-fvdip.ondigitalocean.app/api/user', {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`, // Add the Bearer token for authentication
              Accept: 'application/json',
            },
          });

          const data = await response.json();

          if (response.ok) {
            console.log('User data:', data); // Handle the response data
            setUser(data);
            setIsAuthenticated(true);
          } else {
            console.error('Error fetching user data:', data);
            setIsAuthenticated(false);
          }
        } else {
          console.error('No auth token found');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false); // Ensure loading state is set to false after check
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // Optionally, show a loading spinner or some kind of indicator while loading
    return <div><Loader/></div>
    
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
};
