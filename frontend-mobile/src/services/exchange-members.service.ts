import {
  ExchangeMemberBaseSchema,
  ExchangeMemberQuerySchema,
  ExchangeMemberSchema,
} from '@/types';
import ModelService from './model.service';

export class ExchangeMemberService extends ModelService<
  typeof ExchangeMemberSchema,
  typeof ExchangeMemberBaseSchema,
  typeof ExchangeMemberQuerySchema
> {
  constructor() {
    super({
      url: 'exchange-members',
      schema: ExchangeMemberSchema,
      baseSchema: ExchangeMemberBaseSchema,
      querySchema: ExchangeMemberQuerySchema,
    });
  }
}

const exchangeMemberService = new ExchangeMemberService();

export default exchangeMemberService;
