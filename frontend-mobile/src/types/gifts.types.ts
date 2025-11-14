import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils.types';

export const GiftSchema = ModelMetadataSchema.extend({
  name: z.string(),
  url: z.url().nullable(),
  price: z.number().multipleOf(0.01).nonnegative(),
  is_purchased: z.boolean(),
  from_user: ModelIdSchema,
  to_user: ModelIdSchema,
  wish: ModelIdSchema.nullable(),
  exchange: ModelIdSchema,
});

export type Gift = z.infer<typeof GiftSchema>;
