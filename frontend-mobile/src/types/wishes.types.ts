import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils.types';

export const WishBaseSchema = z.object({
  name: z.string(),
  url: z.url().nullable(),
  user: ModelIdSchema,
  exchange: ModelIdSchema,
});

export type BaseWish = z.infer<typeof WishBaseSchema>;

export const WishQuerySchema = WishBaseSchema.pick({
  user: true,
  exchange: true,
}).partial();

export type WishQuery = z.infer<typeof WishQuerySchema>;

export const WishSchema = ModelMetadataSchema.extend(WishBaseSchema.shape);

export type Wish = z.infer<typeof WishSchema>;
