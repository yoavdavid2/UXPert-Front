import React, { createContext, useContext, useState, ReactNode } from "react";
import { TOKEN_LS, USER_PROFILE_LS } from "../config";
import { UserProfile } from "./UserProfileUtils";
import { IAuthContextType } from "./types";

const AuthContext = createContext<IAuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);

  // useEffect(() => {
  //   const verifyAuth = async () => {
  //     const token = localStorage.getItem(TOKEN_LS);
  //     const savedUserData = localStorage.getItem(USER_PROFILE_LS);

  //     if (!token) {
  //       setIsLoading(false);
  //       return;
  //     }

  //     if (savedUserData) {
  //       try {
  //         const userData = JSON.parse(savedUserData);
  //         setUser(userData);
  //       } catch (error) {
  //         console.error('Failed to parse saved user data', error);
  //       }
  //     }

  //     try {
  //       // const response = await api.get('/api/auth/verify');
  //       setIsAuthenticated(true);

  //       // if (response.data?.user) {
  //       //   setUser(response.data.user);
  //       //   localStorage.setItem(USER_PROFILE_LS, JSON.stringify(response.data.user));
  //     //   }
  //     } catch (err) {
  //       console.error('Token verification failed:', err);
  //       logout();
  //     }
  //     // } finally {
  //     //   setIsLoading(false);
  //     // }
  //   };

  //   verifyAuth();
  // }, []);

  const login = (token: string, userData: UserProfile) => {
    localStorage.setItem(TOKEN_LS, token);
    localStorage.setItem(USER_PROFILE_LS, JSON.stringify(userData));
    setUser(userData);
    setIsAuthenticated(true);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_LS);
    localStorage.removeItem(USER_PROFILE_LS);
    deleteCookie(TOKEN_LS);
    deleteCookie("user");
    setUser(null);
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const decodeUserCookie = (): Record<string, any> | null => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="));

  if (!cookie) return null;

  try {
    const encodedValue = cookie.slice(5);
    const jsonString = decodeURIComponent(encodedValue);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("Failed to decode user cookie:", error);
    return null;
  }
};

export const deleteCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

export const getCookie = (name: string): string | null => {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
};

export const mapToUserProfile = (raw: any): UserProfile => {
  return {
    id: raw.id || raw._id || "",
    firstName: raw.firstName || "",
    lastName: raw.lastName || "",
    email: raw.email || "",
    profileImage: raw.picture || raw.profileImage || null,
    createdAt: raw.createdAt || undefined,
  };
};

export default AuthContext;
