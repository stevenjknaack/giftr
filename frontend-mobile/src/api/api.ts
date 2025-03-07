import axios from 'axios';
import { Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AuthApi from './auth';

const baseURL = 'https://giftr.dev/api/'; //TODO: update to use react env variables

// Default config
const api = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor (for attaching tokens)
api.interceptors.request.use(
  async (config) => {
    // TODO: Add support for android
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
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'token_not_valid'
    ) {
      const refreshToken = await SecureStore.getItemAsync('refreshToken');
      if (refreshToken) {
        const response = await AuthApi.refresh(refreshToken);
        if (response.status === 200) {
          await SecureStore.setItemAsync('accessToken', response.data.access);
          Alert.alert('API Interceptor', 'Successfully refreshed accessToken.');
          return api(error.config);
        } else {
          await SecureStore.deleteItemAsync('refreshToken');
          await SecureStore.deleteItemAsync('accessToken');
          Alert.alert('Session expired', 'Please log in again.');
        }
      } else {
        Alert.alert('Unauthorized', 'Please log in.');
      }
    } else {
      Alert.alert('Request failed', 'Something went wrong.');
    }
    return Promise.reject(error);
  }
);

export default api;
