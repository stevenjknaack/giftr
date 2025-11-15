import { authenticatedAxiosApi as api } from '@/services/axios.service';
import * as z from 'zod';

export default abstract class ModelService<
  ModelSchema extends z.ZodObject,
  ModelBaseSchema extends z.ZodObject,
  QuerySchema extends z.ZodObject = z.ZodObject,
> {
  private url: string;
  private modelSchema: ModelSchema;
  private modelBaseSchema: ModelBaseSchema;
  private querySchema: QuerySchema | null;

  constructor(config: {
    url: string;
    schema: ModelSchema;
    baseSchema: ModelBaseSchema;
    querySchema?: QuerySchema;
  }) {
    this.url = config.url;
    this.modelSchema = config.schema;
    this.modelBaseSchema = config.baseSchema;
    this.querySchema = config.querySchema ?? null;
  }

  private idUrl(id: number) {
    return `${this.url.replaceAll('/', '')}/${id}/`;
  }

  public async create(data: z.infer<ModelBaseSchema>) {
    const parsedData = this.modelBaseSchema.parse(data);
    const res = await api.post(this.url, parsedData);
    return this.modelSchema.parse(res.data);
  }

  public async list(query?: z.infer<QuerySchema>) {
    if (this.querySchema && query) {
      this.querySchema.parse(query);
    }

    let q: Record<string, string> = {};
    Object.entries(q).map(([key, value]) => {
      const str = String(value);
      if (str) q = { ...q, [key]: str };
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

  public async partialUpdate(
    id: number,
    data: Partial<z.infer<ModelBaseSchema>>
  ) {
    const parsedData = this.modelBaseSchema.partial().parse(data);
    const res = await api.patch(this.idUrl(id), parsedData);
    return this.modelSchema.parse(res.data);
  }

  public delete(id: number) {
    return api.delete(this.idUrl(id));
  }
}
