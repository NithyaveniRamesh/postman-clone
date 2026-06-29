import { create } from "zustand";

export interface HistoryItem {
  id: number;
  method: string;
  url: string;
  status_code: number;
  response_time: number;
  response_size: number;
  request_body?: string;
  response_body?: string;
  created_at: string;
}

interface HistoryStore {
  history: HistoryItem[];

  loading: boolean;

  setLoading: (loading: boolean) => void;

  setHistory: (history: HistoryItem[]) => void;

  addHistory: (item: HistoryItem) => void;

  deleteHistory: (id: number) => void;

  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],

  loading: false,

  setLoading: (loading) =>
    set({
      loading,
    }),

  setHistory: (history) =>
    set({
      history,
    }),

  addHistory: (item) =>
    set((state) => ({
      history: [item, ...state.history],
    })),

  deleteHistory: (id) =>
    set((state) => ({
      history: state.history.filter(
        (item) => item.id !== id
      ),
    })),

  clearHistory: () =>
    set({
      history: [],
    }),
}));