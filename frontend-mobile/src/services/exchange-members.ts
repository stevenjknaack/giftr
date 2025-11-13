import { ExchangeMember } from '@/types';
import ModelApi from './base';

const ExchangeMemberApi = new ModelApi<ExchangeMember, { exchange?: string }>(
  'exchange-members/'
);

export default ExchangeMemberApi;
