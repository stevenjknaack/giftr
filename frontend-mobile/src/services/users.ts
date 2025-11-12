import { authenticatedAxiosApi as api } from '@/services/axios';
import { User, BaseData } from '@/types';

const usersUrl = 'users/';
const userIdUrl = (id: number) => `${usersUrl}${id}/`;

const UserApi = {
  list: () => {
    return api.get<User[]>(usersUrl);
  },
  get: (userId: number) => {
    return api.get<User>(userIdUrl(userId));
  },
  partialUpdate: (userId: number, data: Partial<BaseData<User>>) => {
    return api.patch<User>(userIdUrl(userId), data);
  },
  whoAmI: () => {
    return api.get<User>(`auth/whoami/`);
  },
};

export default UserApi;
