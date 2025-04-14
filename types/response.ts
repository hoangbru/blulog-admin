export interface ResponseApi<T = undefined> {
  meta: {
    message: string;
    errors?: unknown;
  };
  data?: T | null;
}
