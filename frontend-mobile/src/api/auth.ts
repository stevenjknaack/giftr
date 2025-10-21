import api from './api';
import { AuthTokenPair, BaseData, User } from './types';

const authUrl = 'auth/';

const AuthApi = {
  register: (data: BaseData<User> & { password: string }) => {
    return api.post<User>(`${authUrl}register/`, data);
  },
  login: (username: string, password: string) => {
    return api.post<AuthTokenPair>(`${authUrl}token/`, {
      username,
      password,
    });
  },
  refresh: (refreshToken: string) => {
    return api.post<Omit<AuthTokenPair, 'refresh'>>(`${authUrl}token/refresh`, {
      refreshToken,
    });
  },
  whoAmI: () => {
    return api.get<User>(`${authUrl}whoami/`);
  },
};

export default AuthApi;
