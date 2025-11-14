import { authenticatedAxiosApi as api } from '@/services/axios.service';
import * as z from 'zod';

export default abstract class ModelService<
  ModelSchema extends z.ZodObject,
  QuerySchema extends z.ZodRecord<
    z.ZodType<string, string>,
    z.ZodOptional<z.ZodString>
  > = z.ZodRecord<z.ZodType<string, string>, z.ZodOptional<z.ZodString>>,
> {
  private url: string;
  private modelSchema: ModelSchema;
  private querySchema: QuerySchema | null;

  constructor(config: {
    url: string;
    schema: ModelSchema;
    querySchema: QuerySchema;
  }) {
    this.url = config.url;
    this.modelSchema = config.schema;
    this.querySchema = config.querySchema ?? null;
  }

  private idUrl(id: number) {
    return `${this.url}${id}/`;
  }

  public async create(data: z.infer<ModelSchema>) {
    const res = await api.post(this.url, data);
    return this.modelSchema.parse(res.data);
  }

  public async list(query?: z.infer<QuerySchema>) {
    if (this.querySchema && query) {
      this.querySchema.parse(query);
    }

    let q: Record<string, string> = {};
    Object.entries(q).map(([key, value]) => {
      if (typeof value === 'string') q = { ...q, [key]: value };
    });
    const qs = query ? `?${new URLSearchParams(q)}` : '';
    const res = await api.get(this.url + qs);

    return z.array(this.modelSchema).parse(res.data);
  }

  public async get(id: number) {
    const res = await api.get(this.idUrl(id));
    return this.modelSchema.parse(res.data);
  }

  public async update(id: number, data: z.infer<ModelSchema>) {
    const res = await api.put(this.idUrl(id), data);
    return this.modelSchema.parse(res.data);
  }

  public async partialUpdate(id: number, data: Partial<z.infer<ModelSchema>>) {
    const res = await api.patch(this.idUrl(id), data);
    return this.modelSchema.parse(res.data);
  }

  public delete(id: number) {
    return api.delete(this.idUrl(id));
  }
}
