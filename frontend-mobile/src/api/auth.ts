import { AuthTokenPair, BaseData, User } from './types';
import axios from 'axios';

const authUrl = 'auth/';
const baseURL = 'https://giftr.dev/api/'; //TODO: update to use react env variables
const baseConfig = {
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

/**
 * Axios instance for accessing non-authenticated routes
 */
export const axiosApi = axios.create(baseConfig);

const AuthApi = {
  register: (data: BaseData<User> & { password: string }) => {
    return axiosApi.post<User>(`${authUrl}register/`, data);
  },
  login: (username: string, password: string) => {
    return axiosApi.post<AuthTokenPair>(`${authUrl}token/`, {
      username,
      password,
    });
  },
  refresh: (refreshToken: string) => {
    return axiosApi.post<Omit<AuthTokenPair, 'refresh'>>(
      `${authUrl}token/refresh`,
      {
        refreshToken,
      }
    );
  },
};

export default AuthApi;
