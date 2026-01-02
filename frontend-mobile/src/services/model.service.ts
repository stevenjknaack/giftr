import { authenticatedApi } from '@/api/authenticated.api';
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
    // need trailing slash for our api
    this.url = config.url.replace(/\/$/, '') + '/';
    this.modelSchema = config.schema;
    this.modelBaseSchema = config.baseSchema;
    this.querySchema = config.querySchema ?? null;
  }

  private idUrl(id: number) {
    return `${this.url.replaceAll('/', '')}/${id}/`;
  }

  public async create(data: z.infer<ModelBaseSchema>) {
    const parsedData = this.modelBaseSchema.parse(data);
    const res = await authenticatedApi.post(this.url, parsedData);
    return this.modelSchema.parse(res.data);
  }

  public async list(query?: z.infer<QuerySchema>) {
    let qs = this.url;
    if (this.querySchema && query) {
      this.querySchema.parse(query);

      let q: Record<string, string> = {};
      Object.entries(query).map(([key, value]) => {
        const str = String(value);
        if (str) q = { ...q, [key]: str };
      });
      qs += `?${new URLSearchParams(q)}`;
    }

    const res = await authenticatedApi.get(qs);
    return z.array(this.modelSchema).parse(res.data);
  }

  public async get(id: number) {
    const res = await authenticatedApi.get(this.idUrl(id));
    return this.modelSchema.parse(res.data);
  }

  public async update(id: number, data: z.infer<ModelSchema>) {
    const res = await authenticatedApi.put(this.idUrl(id), data);
    return this.modelSchema.parse(res.data);
  }

  public async partialUpdate(
    id: number,
    data: Partial<z.infer<ModelBaseSchema>>
  ) {
    const parsedData = this.modelBaseSchema.partial().parse(data);
    const res = await authenticatedApi.patch(this.idUrl(id), parsedData);
    return this.modelSchema.parse(res.data);
  }

  public delete(id: number) {
    return authenticatedApi.delete(this.idUrl(id));
  }
}
