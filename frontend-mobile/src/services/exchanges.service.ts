import ModelApi from '@/services/model.service';
import { Exchange } from '@/types';

export const ExchangeApi = new ModelApi<
  Exchange,
  { member?: string; owner?: string }
>('exchanges/');

export default ExchangeApi;
