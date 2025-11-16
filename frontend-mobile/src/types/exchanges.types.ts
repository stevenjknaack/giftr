import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils.types';

export const ExchangeBaseSchema = z.object({
  name: z.string(),
  owner: ModelIdSchema,
  members: z.array(ModelIdSchema),
});

export type ExchangeBase = z.infer<typeof ExchangeBaseSchema>;

export const ExchangeSchema = ModelMetadataSchema.extend(
  ExchangeBaseSchema.shape
);

export type Exchange = z.infer<typeof ExchangeSchema>;

export const ExchangeQuerySchema = ExchangeBaseSchema.pick({
  owner: true,
})
  .extend({
    member: ModelIdSchema,
  })
  .partial();

export type ExchangeQuery = z.infer<typeof ExchangeQuerySchema>;
