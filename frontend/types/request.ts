export interface RequestModel {
  id?: number;

  name: string;

  method: string;

  url: string;

  params?: Record<string, string>;

  headers?: Record<string, string>;

  body?: string;

  body_type?: string;

  auth_type?: string;

  auth_value?: string;

  collection_id?: number;
}