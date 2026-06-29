import api from "./api";

export const getRequestsByCollection = (
  collectionId: number
) =>
  api.get(`/requests/collection/${collectionId}`);

export const getRequest = (id: number) =>
  api.get(`/requests/${id}`);

export const createRequest = (data: any) =>
  api.post("/requests", data);

export const updateRequest = (
  id: number,
  data: any
) =>
  api.put(`/requests/${id}`, data);

export const deleteRequest = (id: number) =>
  api.delete(`/requests/${id}`);