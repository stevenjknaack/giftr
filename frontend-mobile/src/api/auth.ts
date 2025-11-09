import api from './api';
import { User } from './types';

const authUrl = 'auth/';

const AuthApi = {
  whoAmI: () => {
    return api.get<User>(`${authUrl}whoami/`);
  },
};

export default AuthApi;
