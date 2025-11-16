import ModelApiService from '@/services/model.service';
import {
  ExchangeSchema,
  ExchangeBaseSchema,
  ExchangeQuerySchema,
} from '@/types';

export class ExchangeService extends ModelApiService<
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
