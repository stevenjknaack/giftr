import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils.types';

export const GiftBaseSchema = z.object({
  name: z.string(),
  url: z.url().nullable(),
  price: z.number().multipleOf(0.01).nonnegative(),
  is_purchased: z.boolean(),
  from_user: ModelIdSchema,
  to_user: ModelIdSchema,
  wish: ModelIdSchema.nullable(),
  exchange: ModelIdSchema,
});

export type GiftBase = z.infer<typeof GiftBaseSchema>;

export const GiftSchema = ModelMetadataSchema.extend(GiftBaseSchema.shape);

export type Gift = z.infer<typeof GiftSchema>;

export const GiftQuerySchema = GiftBaseSchema.pick({
  exchange: true,
})
  .extend({
    to: ModelIdSchema,
    from: ModelIdSchema,
  })
  .partial();

export type GiftQuery = z.infer<typeof GiftQuerySchema>;
