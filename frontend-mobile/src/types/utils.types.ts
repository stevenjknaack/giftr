import * as z from 'zod';

export const ModelIdSchema = z.number().int();

export type ModelId = z.infer<typeof ModelIdSchema>;

export const ModelMetadataSchema = z.object({
  id: ModelIdSchema,
  created_at: z.string(),
  modified_at: z.string(),
});

export type ModelMetadata = z.infer<typeof ModelMetadataSchema>;
