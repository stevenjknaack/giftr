import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils.types';

export const ExchangeMemberBaseSchema = z.object({
  user: ModelIdSchema,
  exchange: ModelIdSchema,
});

export type ExchangeMemberBase = z.infer<typeof ExchangeMemberBaseSchema>;

export const ExchangeMemberSchema = ModelMetadataSchema.extend(
  ExchangeMemberBaseSchema.shape
);

export type ExchangeMember = z.infer<typeof ExchangeMemberSchema>;

export const ExchangeMemberQuerySchema = ExchangeMemberBaseSchema.pick({
  exchange: true,
}).partial();

export type ExchangeMemberQuery = z.infer<typeof ExchangeMemberQuerySchema>;
