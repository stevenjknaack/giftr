import api from './api';
import { BaseData } from './types';

export default class ModelApi<
  T,
  Q extends Record<string, string> = Record<string, never>,
> {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  private idUrl(id: number) {
    return `${this.url}${id}/`;
  }

  public create(data: BaseData<T>) {
    return api.post<T>(this.url, data);
  }

  public list(query: Q = {} as Q) {
    const queryString = new URLSearchParams(query).toString();
    return api.get<T[]>(`${this.url}?${queryString}`);
  }

  public get(id: number) {
    return api.get<T>(this.idUrl(id));
  }

  public update(id: number, data: BaseData<T> | T) {
    return api.put<T>(this.idUrl(id), data);
  }

  public partialUpdate(id: number, data: Partial<BaseData<T>>) {
    return api.patch<T>(this.idUrl(id), data);
  }

  public delete(id: number) {
    return api.delete<undefined>(this.idUrl(id));
  }
}
