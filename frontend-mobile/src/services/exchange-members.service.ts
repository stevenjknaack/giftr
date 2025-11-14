import { ExchangeMember } from '@/types';
import ModelApi from './model.service';

const ExchangeMemberApi = new ModelApi<ExchangeMember, { exchange?: string }>(
  'exchange-members/'
);

export default ExchangeMemberApi;
