import { create } from "zustand";

export interface SavedRequest {
  id: number;
  name: string;
  method: string;
  url: string;
}

export interface Collection {
  id: number;
  name: string;
  description?: string;

  requests: SavedRequest[];

  created_at: string;
  updated_at: string;
}

interface CollectionStore {
  collections: Collection[];

  loading: boolean;

  expandedCollections: number[];

  selectedCollectionId: number | null;

  selectedRequestId: number | null;

  setLoading: (loading: boolean) => void;

  setCollections: (collections: Collection[]) => void;

  addCollection: (collection: Collection) => void;

  updateCollection: (collection: Collection) => void;

  deleteCollection: (id: number) => void;

  toggleCollection: (id: number) => void;

  selectCollection: (id: number | null) => void;

  selectRequest: (id: number | null) => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: [],

  loading: false,

  expandedCollections: [],

  selectedCollectionId: null,

  selectedRequestId: null,

  setLoading: (loading) =>
    set({
      loading,
    }),

  setCollections: (collections) =>
    set({
      collections,
    }),

  addCollection: (collection) =>
    set((state) => ({
      collections: [...state.collections, collection],
    })),

  updateCollection: (collection) =>
    set((state) => ({
      collections: state.collections.map((item) =>
        item.id === collection.id ? collection : item
      ),
    })),

  deleteCollection: (id) =>
    set((state) => ({
      collections: state.collections.filter(
        (item) => item.id !== id
      ),

      expandedCollections:
        state.expandedCollections.filter(
          (collectionId) => collectionId !== id
        ),

      selectedCollectionId:
        state.selectedCollectionId === id
          ? null
          : state.selectedCollectionId,
    })),

  toggleCollection: (id) =>
    set((state) => ({
      expandedCollections:
        state.expandedCollections.includes(id)
          ? state.expandedCollections.filter(
              (collectionId) => collectionId !== id
            )
          : [...state.expandedCollections, id],
    })),

  selectCollection: (id) =>
    set({
      selectedCollectionId: id,
    }),

  selectRequest: (id) =>
    set({
      selectedRequestId: id,
    }),
}));