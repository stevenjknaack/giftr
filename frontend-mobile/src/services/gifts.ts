import ModelApi from '@/services/base';
import { Gift } from '@/types';

const GiftApi = new ModelApi<
  Gift,
  { to?: string; from?: string; exchange?: string }
>('gifts/');

export default GiftApi;
