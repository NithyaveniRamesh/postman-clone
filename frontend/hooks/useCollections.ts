"use client";

import { useEffect } from "react";

import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} from "@/services/collections";

import { useCollectionStore } from "@/store/collectionStore";

export function useCollections() {
  const {
    collections,
    loading,
    setLoading,
    setCollections,
    addCollection,
    updateCollection: updateStore,
    deleteCollection: deleteStore,
  } = useCollectionStore();

  async function loadCollections() {
    try {
      setLoading(true);

      const res = await getCollections();

      setCollections(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function createNewCollection(
    name: string,
    description = ""
  ) {
    const res = await createCollection({
      name,
      description,
    });

    addCollection(res.data);

    await loadCollections();
  }

  async function renameCollection(
    id: number,
    name: string,
    description = ""
  ) {
    const res = await updateCollection(id, {
      name,
      description,
    });

    updateStore(res.data);

    await loadCollections();
  }

  async function removeCollection(id: number) {
    await deleteCollection(id);

    deleteStore(id);

    await loadCollections();
  }

  useEffect(() => {
    loadCollections();
  }, []);

  return {
    collections,
    loading,
    loadCollections,
    createNewCollection,
    renameCollection,
    removeCollection,
  };
}