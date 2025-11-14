import * as z from 'zod';

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string(),
  email: z.email(),
  first_name: z.string(),
  last_name: z.string(),
});

export type User = z.infer<typeof UserSchema>;
