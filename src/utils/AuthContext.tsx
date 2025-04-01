import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/Api';
import { TOKEN_LS, USER_PROFILE_LS } from '../config';
import { UserProfile } from '../types/UserProfile';


interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  login: (token: string, userData: UserProfile) => void;
  logout: () => void;
}


const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: () => {},
  logout: () => {},
});


export const useAuth = () => useContext(AuthContext);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  
  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem(TOKEN_LS);
      const savedUserData = localStorage.getItem(USER_PROFILE_LS);
      
      
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      
      if (savedUserData) {
        try {
          const userData = JSON.parse(savedUserData);
          setUser(userData);
        } catch (error) {
          console.error('Failed to parse saved user data', error);
        }
      }
      
      try {
        const response = await api.get('/api/auth/verify');
        setIsAuthenticated(true);
        
        
        if (response.data?.user) {
          setUser(response.data.user);
          localStorage.setItem(USER_PROFILE_LS, JSON.stringify(response.data.user));
        }
      } catch (err) {
        console.error('Token verification failed:', err);
        logout();
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyAuth();
  }, []);
  
  
  const login = (token: string, userData: UserProfile) => {
    localStorage.setItem(TOKEN_LS, token);
    localStorage.setItem(USER_PROFILE_LS, JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  
  const logout = () => {
    localStorage.removeItem(TOKEN_LS);
    localStorage.removeItem(USER_PROFILE_LS);
    setUser(null);
    window.location.reload()
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;