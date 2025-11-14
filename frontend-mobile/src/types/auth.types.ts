import * as z from 'zod';

export const AuthTokenPairSchema = z.object({
  access: z.jwt(),
  refresh: z.jwt(),
});

export type AuthTokenPair = z.infer<typeof AuthTokenPairSchema>;
