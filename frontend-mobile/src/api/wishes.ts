import ModelApi from './base';
import { Wish } from './types';

const WishApi = new ModelApi<Wish, { user?: string; exchange?: string }>(
  'wishes/'
);

export default WishApi;
