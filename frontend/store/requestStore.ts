import { create } from "zustand";

interface SavedRequest {
  method: string;
  url: string;
  headers?: Record<string, string>;
  params?: Record<string, string>;
  body?: string;
  auth_type?: string;
  auth_value?: string;
}

interface RequestStore {
  method: string;

  url: string;

  headers: Record<string, string>;

  params: Record<string, string>;

  body: string;

  authType: string;

  authValue: string;

  setMethod: (method: string) => void;

  setUrl: (url: string) => void;

  setHeaders: (
    headers: Record<string, string>
  ) => void;

  setParams: (
    params: Record<string, string>
  ) => void;

  setBody: (body: string) => void;

  setAuthType: (type: string) => void;

  setAuthValue: (value: string) => void;

  loadRequest: (request: SavedRequest) => void;
}

export const useRequestStore =
  create<RequestStore>((set) => ({
    method: "GET",

    url: "",

    headers: {},

    params: {},

    body: "",

    authType: "None",

    authValue: "",

    setMethod: (method) =>
      set({
        method,
      }),

    setUrl: (url) =>
      set({
        url,
      }),

    setHeaders: (headers) =>
      set({
        headers,
      }),

    setParams: (params) =>
      set({
        params,
      }),

    setBody: (body) =>
      set({
        body,
      }),

    setAuthType: (authType) =>
      set({
        authType,
      }),

    setAuthValue: (authValue) =>
      set({
        authValue,
      }),

    loadRequest: (request) =>
      set({
        method: request.method,
        url: request.url,
        headers: request.headers ?? {},
        params: request.params ?? {},
        body: request.body ?? "",
        authType: request.auth_type ?? "None",
        authValue: request.auth_value ?? "",
      }),
  }));