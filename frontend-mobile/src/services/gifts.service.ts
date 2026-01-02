import ModelService from '@/services/model.service';
import { GiftBaseSchema, GiftQuerySchema, GiftSchema } from '@/types';

export class GiftService extends ModelService<
  typeof GiftSchema,
  typeof GiftBaseSchema,
  typeof GiftQuerySchema
> {
  constructor() {
    super({
      url: 'gifts',
      schema: GiftSchema,
      baseSchema: GiftBaseSchema,
      querySchema: GiftQuerySchema,
    });
  }
}

const giftService = new GiftService();

export default giftService;
