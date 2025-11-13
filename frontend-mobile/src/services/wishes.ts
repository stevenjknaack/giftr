import ModelApi from '@/services/base';
import { Wish } from '@/types';

const WishApi = new ModelApi<Wish, { user?: string; exchange?: string }>(
  'wishes/'
);

export default WishApi;
