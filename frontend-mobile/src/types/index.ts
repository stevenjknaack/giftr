export type User = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
};

export type Exchange = {
  id: number;
  name: string;
  created_at: string;
  modified_at: string;
  owner: number;
  members: number[];
};

export type ExchangeMember = {
  id: number;
  created_at: string;
  modified_at: string;
  user: number;
  exchange: number;
};

export type Wish = {
  id: number;
  name: string;
  url: string | null;
  created_at: string;
  modified_at: string;
  user: number;
  exchange: number;
};

export type Gift = {
  id: number;
  name: string;
  url: string | null;
  price: number;
  is_purchased: boolean;
  created_at: string;
  modified_at: string;
  from_user: number;
  to_user: number;
  wish: number | null;
  exchange: number;
};

export type AuthTokenPair = {
  access: string;
  refresh: string;
};

export type BaseData<T> = Omit<T, 'id' | 'modified_at' | 'created_at'>;
