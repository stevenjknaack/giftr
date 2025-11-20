import { UserBaseSchema, UserSchema } from '@/types';
import ModelService from './model.service';
import { authenticatedApi } from '@/api/authenticated.api';

export class UserService extends ModelService<
  typeof UserSchema,
  typeof UserBaseSchema
> {
  constructor() {
    super({
      url: 'users',
      schema: UserSchema,
      baseSchema: UserBaseSchema,
    });
  }

  /**
   * @deprecated Not Implemented
   * @override
   */
  public async create(): Promise<never> {
    throw new Error('Not Implemented');
  }

  /**
   * @deprecated Not Implemented
   * @override
   */
  public async update(): Promise<never> {
    throw new Error('Not Implemented');
  }

  /**
   * @deprecated Not Implemented
   * @override
   */
  public async delete(): Promise<never> {
    throw new Error('Not Implemented');
  }

  public async whoAmI() {
    const res = await authenticatedApi.get(`auth/whoami/`);
    return UserSchema.parse(res.data);
  }
}

const userService = new UserService();

export default userService;
