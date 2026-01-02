import ModelService from '@/services/model.service';
import { WishBaseSchema, WishQuerySchema, WishSchema } from '@/types';

export class WishService extends ModelService<
  typeof WishSchema,
  typeof WishBaseSchema,
  typeof WishQuerySchema
> {
  constructor() {
    super({
      url: 'wishes',
      schema: WishSchema,
      baseSchema: WishBaseSchema,
      querySchema: WishQuerySchema,
    });
  }
}

const wishService = new WishService();

export default wishService;
