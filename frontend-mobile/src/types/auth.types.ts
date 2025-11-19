import * as z from 'zod';
import { UserBaseSchema } from './users.types';

export const AuthTokenPairSchema = z.object({
  access: z.jwt(),
  refresh: z.jwt(),
});

export type AuthTokenPair = z.infer<typeof AuthTokenPairSchema>;

export const RegistrationUserSchema = UserBaseSchema.extend({
  password: z.string(),
});

export type RegistrationUser = z.infer<typeof RegistrationUserSchema>;

export const LoginRequestSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export const RefreshRequestSchema = AuthTokenPairSchema.pick({
  refresh: true,
});

export type RefreshRequest = z.infer<typeof RefreshRequestSchema>;

export const RefreshResponseSchema = AuthTokenPairSchema.pick({
  access: true,
});

export type RefreshResponse = z.infer<typeof RefreshResponseSchema>;
