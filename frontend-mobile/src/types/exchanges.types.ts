import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils.types';

export const ExchangeSchema = ModelMetadataSchema.extend({
  name: z.string(),
  owner: ModelIdSchema,
  members: z.array(ModelIdSchema),
});

export type Exchange = z.infer<typeof ExchangeSchema>;
