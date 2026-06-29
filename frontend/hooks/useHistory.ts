"use client";

import { useEffect } from "react";

import {
  clearHistory,
  deleteHistory,
  getHistory,
} from "@/services/history";

import { useHistoryStore } from "@/store/historyStore";

export function useHistory() {
  const {
    history,
    setHistory,
    loading,
    setLoading,
    deleteHistory: removeHistory,
    clearHistory: clearStore,
  } = useHistoryStore();

  // ==========================
  // Load History
  // ==========================

  async function loadHistory() {
    try {
      setLoading(true);

      const data = await getHistory();

      setHistory(data);
    } catch (error) {
      console.error("Failed to load history:", error);
    } finally {
      setLoading(false);
    }
  }

  // ==========================
  // Delete One Item
  // ==========================

  async function removeItem(id: number) {
    try {
      await deleteHistory(id);

      removeHistory(id);
    } catch (error) {
      console.error(error);
    }
  }

  // ==========================
  // Clear All
  // ==========================

  async function clearAll() {
    try {
      await clearHistory();

      clearStore();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadHistory();
  }, []);

  return {
    history,
    loading,
    loadHistory,
    removeItem,
    clearAll,
  };
}