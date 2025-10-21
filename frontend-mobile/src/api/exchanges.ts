import ModelApi from './base';
import { Exchange, ExchangeMember } from './types';

const ExchangeApi = new ModelApi<Exchange, { member?: string; owner?: string }>(
  'exchanges/'
);

export default ExchangeApi;

export const ExchangeMemberApi = new ModelApi<
  ExchangeMember,
  { exchange?: string }
>('exchange-members/');
