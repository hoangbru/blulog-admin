export interface APIErrorResponse {
  meta: {
    message: string;
    errors?: boolean | string[];
  };
}
