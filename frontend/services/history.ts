import api from "./api";

// ===============================
// Get All History
// ===============================
export async function getHistory() {
  const response = await api.get("/history");
  return response.data;
}

// ===============================
// Get One History Item
// ===============================
export async function getHistoryItem(id: number) {
  const response = await api.get(`/history/${id}`);
  return response.data;
}

// ===============================
// Delete One History Item
// ===============================
export async function deleteHistory(id: number) {
  const response = await api.delete(`/history/${id}`);
  return response.data;
}

// ===============================
// Clear Entire History
// ===============================
export async function clearHistory() {
  const response = await api.delete("/history");
  return response.data;
}