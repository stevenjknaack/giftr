import ModelApi from '@/services/base';
import { Exchange } from '@/types';

export const ExchangeApi = new ModelApi<
  Exchange,
  { member?: string; owner?: string }
>('exchanges/');

export default ExchangeApi;
