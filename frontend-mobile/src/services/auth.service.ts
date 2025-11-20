import { unauthenticatedApi } from '@/api/unauthenticated.api';
import {
  AuthTokenPairSchema,
  LoginRequest,
  LoginRequestSchema,
  RefreshRequest,
  RefreshRequestSchema,
  RefreshResponseSchema,
  RegistrationUser,
  RegistrationUserSchema,
  UserSchema,
} from '@/types';

export class AuthService {
  private url = 'auth';

  public async register(data: RegistrationUser) {
    const parsedData = RegistrationUserSchema.parse(data);
    const res = await unauthenticatedApi.post(
      `${this.url}/register/`,
      parsedData
    );
    return UserSchema.parse(res.data);
  }

  public async login(data: LoginRequest) {
    const parsedData = LoginRequestSchema.parse(data);
    const res = await unauthenticatedApi.post(`${this.url}/token/`, parsedData);
    return AuthTokenPairSchema.parse(res.data);
  }

  public async refresh(data: RefreshRequest) {
    const parsedData = RefreshRequestSchema.parse(data);
    const res = await unauthenticatedApi.post(
      `${this.url}/token/refresh`,
      parsedData
    );
    return RefreshResponseSchema.parse(res.data);
  }
}

const authService = new AuthService();

export default authService;
