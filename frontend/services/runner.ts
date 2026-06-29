import api from "./api";

export const sendRequest = (request: any) =>
  api.post("/runner/send", request);