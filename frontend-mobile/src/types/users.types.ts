import * as z from 'zod';
import { ModelIdSchema } from './utils.types';

export const UserBaseSchema = z.object({
  username: z.string(),
  email: z.email(),
  first_name: z.string(),
  last_name: z.string(),
});

export type UserBase = z.infer<typeof UserBaseSchema>;

export const UserSchema = UserBaseSchema.extend({
  id: ModelIdSchema,
});

export type User = z.infer<typeof UserSchema>;
