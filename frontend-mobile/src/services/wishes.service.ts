import ModelService from '@/services/model.service';
import { WishQuerySchema, WishSchema } from '@/types';

export class WishService extends ModelService<
  typeof WishSchema,
  typeof WishQuerySchema
> {
  constructor() {
    super({
      url: 'wishes/',
      schema: WishSchema,
      querySchema: WishQuerySchema,
    });
  }
}

const wishService = new WishService();

export default wishService;
