import ModelService from '@/services/model.service';
import {
  ExchangeSchema,
  ExchangeBaseSchema,
  ExchangeQuerySchema,
} from '@/types';

export class ExchangeService extends ModelService<
  typeof ExchangeSchema,
  typeof ExchangeBaseSchema,
  typeof ExchangeQuerySchema
> {
  constructor() {
    super({
      url: 'exchanges',
      schema: ExchangeSchema,
      baseSchema: ExchangeBaseSchema,
      querySchema: ExchangeQuerySchema,
    });
  }
}

const exchangeService = new ExchangeService();

export default exchangeService;
