import * as z from 'zod';

export const ModelIdSchema = z.number().int();

export const ModelMetadataSchema = z.object({
  id: ModelIdSchema,
  created_at: z.string(),
  modified_at: z.string(),
});

export type BaseData<T> = Omit<T, 'id' | 'modified_at' | 'created_at'>;
