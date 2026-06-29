import api from "./api";

export const getEnvironments = () =>
  api.get("/environments");

export const createEnvironment = (data: any) =>
  api.post("/environments", data);

export const updateEnvironment = (
  id: number,
  data: any
) =>
  api.put(`/environments/${id}`, data);

export const deleteEnvironment = (
  id: number
) =>
  api.delete(`/environments/${id}`);