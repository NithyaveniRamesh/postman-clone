export interface ResponseModel {
  status_code: number;

  response_time: number;

  response_size: number;

  headers: Record<string, string>;

  body: string;
}