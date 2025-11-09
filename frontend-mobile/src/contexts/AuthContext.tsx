// TODO: Add support for Android
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { Alert } from 'react-native';
import AuthApi from '@/api/auth';
import NoAuthApi from '@/api/noauth';
import { User } from '@/api/types';

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

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      if (accessToken) {
        setUser((await AuthApi.whoAmI()).data);
        setIsAuthenticated(true);
      }
    };
    checkAuthentication();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await NoAuthApi.login(username, password);

      if (response.status !== 200) {
        throw new Error();
      }

      const data = response.data;

      await SecureStore.setItemAsync('accessToken', data.access);
      await SecureStore.setItemAsync('refreshToken', data.refresh);

      setUser((await AuthApi.whoAmI()).data);
      setIsAuthenticated(true);

      Alert.alert('login success', 'succeeded!');
      return true;
    } catch (error) {
      Alert.alert('error', 'caught' + error);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('refreshToken');
    setIsAuthenticated(false);
    setUser(null);
    Alert.alert('logout success', 'yes');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
