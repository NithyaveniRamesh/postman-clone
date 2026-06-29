import api from "./api";

export const getCollections = () =>
  api.get("/collections");

export const createCollection = (data: any) =>
  api.post("/collections", data);

export const updateCollection = (
  id: number,
  data: any
) =>
  api.put(`/collections/${id}`, data);

export const deleteCollection = (id: number) =>
  api.delete(`/collections/${id}`);