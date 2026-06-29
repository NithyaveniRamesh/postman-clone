"use client";

import { useState } from "react";
import {
  Folder,
  FolderOpen,
  Plus,
  ChevronRight,
  ChevronDown,
} from "lucide-react";

import { useCollections } from "@/hooks/useCollections";
import { useCollectionStore } from "@/store/collectionStore";
import { useRequestStore } from "@/store/requestStore";

import { getRequest } from "@/services/request";

import NewCollectionDialog from "../collection/NewCollectionDialog";

export default function CollectionsTree() {
  const { collections, loading } = useCollections();

  const {
    expandedCollections,
    toggleCollection,
    selectCollection,
    selectedCollectionId,
  } = useCollectionStore();

  const { loadRequest } = useRequestStore();

  const [selectedRequestId, setSelectedRequestId] =
    useState<number | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const {
  setMethod,
  setUrl,
  setBody,
  setHeaders,
  setParams,
  setAuthType,
  setAuthValue,
} = useRequestStore();


  async function openRequest(requestId: number) {
  console.log("Clicked Request ID:", requestId);

  try {
    const res = await getRequest(requestId);

    console.log("API Response:", res.data);

    loadRequest(res.data);

    console.log("Loaded into store");

    setSelectedRequestId(requestId);
  } catch (err) {
    console.error(err);
    alert("Unable to load request");
  }
}

  return (
    <>
      <div className="flex h-full flex-col">

        <div className="border-b border-zinc-800 p-3">
          <button
            onClick={() => setOpenDialog(true)}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
          >
            <Plus size={16} />
            New Collection
          </button>
        </div>

        <div className="flex-1 overflow-auto p-2">

          {loading && (
            <div className="p-4 text-sm text-zinc-500">
              Loading collections...
            </div>
          )}

          {!loading &&
            collections.map((collection) => {

              const expanded =
                expandedCollections.includes(collection.id);

              return (
                <div
                  key={collection.id}
                  className="mb-1"
                >

                  <div
                    onClick={() => {
                      toggleCollection(collection.id);
                      selectCollection(collection.id);
                    }}
                    className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-2

                    ${
                      selectedCollectionId === collection.id
                        ? "bg-zinc-800"
                        : "hover:bg-zinc-800"
                    }`}
                  >

                    {expanded ? (
                      <ChevronDown size={16} />
                    ) : (
                      <ChevronRight size={16} />
                    )}

                    {expanded ? (
                      <FolderOpen
                        size={18}
                        className="text-orange-400"
                      />
                    ) : (
                      <Folder
                        size={18}
                        className="text-orange-400"
                      />
                    )}

                    <span className="text-sm font-medium">
                      {collection.name}
                    </span>

                  </div>

                  {expanded && (
                    <div className="ml-8 mt-1 space-y-1">

                      {collection.requests.length > 0 ? (

                        collection.requests.map((request) => (

                          <div
                            key={request.id}
                            onClick={() =>
                              openRequest(request.id)
                            }
                            className={`flex cursor-pointer items-center gap-2 rounded-md px-2 py-2 text-sm

                            ${
                              selectedRequestId === request.id
                                ? "bg-zinc-700"
                                : "hover:bg-zinc-800"
                            }`}
                          >

                            <span
                              className={`w-12 text-xs font-semibold

                              ${
                                request.method === "GET"
                                  ? "text-green-400"
                                  : request.method === "POST"
                                  ? "text-blue-400"
                                  : request.method === "PUT"
                                  ? "text-yellow-400"
                                  : request.method === "DELETE"
                                  ? "text-red-400"
                                  : "text-zinc-400"
                              }`}
                            >
                              {request.method}
                            </span>

                            <span className="truncate">
                              {request.name}
                            </span>

                          </div>

                        ))

                      ) : (

                        <div className="px-2 py-2 text-xs text-zinc-500">
                          No Requests
                        </div>

                      )}

                    </div>
                  )}

                </div>
              );

            })}

        </div>

      </div>

      <NewCollectionDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      />

    </>
  );
}