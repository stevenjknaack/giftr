import * as z from 'zod';

export const UserBaseSchema = z.object({
  username: z.string(),
  email: z.email(),
  first_name: z.string(),
  last_name: z.string(),
});

export type UserBase = z.infer<typeof UserBaseSchema>;

export const UserSchema = UserBaseSchema.extend({
  id: z.number().int(),
});

export type User = z.infer<typeof UserSchema>;
