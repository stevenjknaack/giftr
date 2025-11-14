import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils';

export const WishSchema = ModelMetadataSchema.extend({
  name: z.string(),
  url: z.url().nullable(),
  user: ModelIdSchema,
  exchange: ModelIdSchema,
});

export type Wish = z.infer<typeof WishSchema>;
