import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils.types';

export const WishSchema = ModelMetadataSchema.extend({
  name: z.string(),
  url: z.url().nullable(),
  user: ModelIdSchema,
  exchange: ModelIdSchema,
});

export type Wish = z.infer<typeof WishSchema>;

export const WishQuerySchema = z.record(
  z.enum(['user', 'exchange']),
  z.string().optional()
);

export type WishQuery = z.infer<typeof WishQuerySchema>;
