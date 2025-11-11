import axios from 'axios';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AuthApi from './auth';

const baseURL = 'https://giftr.dev/api/'; //TODO: update to use react env variables
const baseConfig = {
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Axios instance for accessing authenticated routes
 */
export const authenticatedAxiosApi = axios.create(baseConfig);

// Request Interceptor (for attaching tokens)
authenticatedAxiosApi.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (for handling errors)
authenticatedAxiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response?.status !== 401 ||
      error.response?.data?.code !== 'token_not_valid'
    ) {
      Alert.alert('Request failed', 'Something went wrong.');
      return Promise.reject(error);
    }

    const refreshToken = await SecureStore.getItemAsync('refreshToken');
    if (!refreshToken) {
      Alert.alert('Unauthorized', 'Please log in.');
      return Promise.reject(error);
    }

    const response = await AuthApi.refresh(refreshToken);
    if (response.status !== 200) {
      await SecureStore.deleteItemAsync('refreshToken');
      await SecureStore.deleteItemAsync('accessToken');
      Alert.alert('Session expired', 'Please log in again.');
    }

    await SecureStore.setItemAsync('accessToken', response.data.access);
    Alert.alert('API Interceptor', 'Successfully refreshed accessToken.');
    return authenticatedAxiosApi(error.config);
  }
);
