"use client";

import { useState } from "react";

import { createRequest } from "@/services/request";
import { useCollections } from "@/hooks/useCollections";
import { useRequestStore } from "@/store/requestStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function SaveRequestDialog({
  open,
  onClose,
}: Props) {
  const { collections, loadCollections } = useCollections();

  const {
    method,
    url,
    headers,
    params,
    body,
    authType,
    authValue,
  } = useRequestStore();

  const [name, setName] = useState("");
  const [collectionId, setCollectionId] = useState<number>();

  if (!open) return null;

  async function handleSave() {
    if (!name.trim()) {
      alert("Enter request name");
      return;
    }

    if (!collectionId) {
      alert("Select a collection");
      return;
    }

    try {
      await createRequest({
        name,
        method,
        url,
        params,
        headers,
        body,
        body_type: "raw",
        content_type: "application/json",
        auth_type: authType,
        auth_value: authValue,
        collection_id: collectionId,
      });

      await loadCollections();

      setName("");
      setCollectionId(undefined);

      onClose();

      alert("Request Saved Successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save request");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-[450px] rounded-lg bg-[#262626] p-6">

        <h2 className="mb-5 text-xl font-semibold">
          Save Request
        </h2>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Request Name"
          className="mb-4 w-full rounded border border-zinc-700 bg-zinc-900 p-2"
        />

        <select
          value={collectionId ?? ""}
          onChange={(e) =>
            setCollectionId(Number(e.target.value))
          }
          className="mb-6 w-full rounded border border-zinc-700 bg-zinc-900 p-2"
        >
          <option value="">
            Select Collection
          </option>

          {collections.map((collection) => (
            <option
              key={collection.id}
              value={collection.id}
            >
              {collection.name}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded bg-zinc-700 px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded bg-orange-500 px-4 py-2 hover:bg-orange-600"
          >
            Save
          </button>

        </div>

      </div>

    </div>
  );
}