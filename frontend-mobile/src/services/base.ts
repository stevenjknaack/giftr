import { BaseData } from '@/types';
import { authenticatedAxiosApi as api } from '@/services/axios';

export default class ModelApi<
  Model,
  Queries extends Record<string, string> = Record<string, never>,
> {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  private idUrl(id: number) {
    return `${this.url}${id}/`;
  }

  public create(data: BaseData<Model>) {
    return api.post<Model>(this.url, data);
  }

  public list(query: Queries = {} as Queries) {
    const queryString = new URLSearchParams(query).toString();
    return api.get<Model[]>(`${this.url}?${queryString}`);
  }

  public get(id: number) {
    return api.get<Model>(this.idUrl(id));
  }

  public update(id: number, data: BaseData<Model> | Model) {
    return api.put<Model>(this.idUrl(id), data);
  }

  public partialUpdate(id: number, data: Partial<BaseData<Model>>) {
    return api.patch<Model>(this.idUrl(id), data);
  }

  public delete(id: number) {
    return api.delete<undefined>(this.idUrl(id));
  }
}
