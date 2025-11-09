import axios from 'axios';
import { AuthTokenPair, BaseData, User } from './types';

const authUrl = 'auth/';
const baseURL = 'https://giftr.dev/api/'; //TODO: update to use react env variables

// Default config
const noAuthApi = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const NoAuthApi = {
  register: (data: BaseData<User> & { password: string }) => {
    return noAuthApi.post<User>(`${authUrl}register/`, data);
  },
  login: (username: string, password: string) => {
    return noAuthApi.post<AuthTokenPair>(`${authUrl}token/`, {
      username,
      password,
    });
  },
  refresh: (refreshToken: string) => {
    return noAuthApi.post<Omit<AuthTokenPair, 'refresh'>>(
      `${authUrl}token/refresh`,
      {
        refreshToken,
      }
    );
  },
};

export default NoAuthApi;
