import * as z from 'zod';
import { ModelIdSchema, ModelMetadataSchema } from './utils';

export const ExchangeMemberSchema = ModelMetadataSchema.extend({
  user: ModelIdSchema,
  exchange: ModelIdSchema,
});

export type ExchangeMember = z.infer<typeof ExchangeMemberSchema>;
