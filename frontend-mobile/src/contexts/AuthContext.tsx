// TODO: Add support for Android
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';
import { callLogin } from '@/api/users';

type User = {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
};

type AuthContextType = {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = await Keychain.getGenericPassword();
      if (accessToken) {
        setIsAuthenticated(true);
        // TODO: use whoAmI endpoint to fetch user data
      }
    };
    checkAuthentication();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await callLogin(username, password);
    
      if (response.status !== 200) {
        throw new Error();
      }

      const data = response.data;

      // await Keychain.setGenericPassword('accessToken', data.access);
      // await Keychain.setGenericPassword('refreshToken', data.refresh);

      await setIsAuthenticated(true);
      Alert.alert("login success", "succeeded!")
      return true;
    } catch (error) {
      Alert.alert("error", "caught" + error)
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    await Keychain.resetGenericPassword();
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
