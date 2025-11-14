import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils.types';

export const WishSchema = ModelMetadataSchema.extend({
  name: z.string(),
  url: z.url().nullable(),
  user: ModelIdSchema,
  exchange: ModelIdSchema,
});

export type Wish = z.infer<typeof WishSchema>;

export const WishQuerySchema = WishSchema.pick({
  user: true,
  exchange: true,
}).partial();

export type WishQuery = z.infer<typeof WishQuerySchema>;
