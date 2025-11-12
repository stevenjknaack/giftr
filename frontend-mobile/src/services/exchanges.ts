import ModelApi from '@/services/base';
import { Exchange, ExchangeMember } from '@/types';

// const ExchangeApi = new ModelApi<Exchange, { member?: string; owner?: string }>(
//   'exchanges/'
// );

class ExchangeService extends ModelApi<
  Exchange,
  { member?: string; owner?: string }
> {}

export default ExchangeService;

export const ExchangeMemberApi = new ModelApi<
  ExchangeMember,
  { exchange?: string }
>('exchange-members/');
