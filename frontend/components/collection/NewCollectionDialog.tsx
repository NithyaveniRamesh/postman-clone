"use client";

import { useEffect, useRef, useState } from "react";
import { FolderPlus, X } from "lucide-react";

import { useCollections } from "@/hooks/useCollections";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function NewCollectionDialog({
  open,
  onClose,
}: Props) {
  const { createNewCollection } = useCollections();

  const inputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);

      setError("");
    }
  }, [open]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape
      );
  }, [onClose]);

  if (!open) return null;

  async function handleCreate() {
    if (!name.trim()) {
      setError("Collection name is required.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createNewCollection(
        name.trim(),
        description.trim()
      );

      setName("");
      setDescription("");

      onClose();
    } catch (err) {
      console.error(err);

      setError("Failed to create collection.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">

      <div className="w-[480px] rounded-xl border border-zinc-700 bg-[#232323] shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-700 p-5">

          <div className="flex items-center gap-2">

            <FolderPlus
              size={22}
              className="text-orange-400"
            />

            <h2 className="text-lg font-semibold">
              New Collection
            </h2>

          </div>

          <button
            onClick={onClose}
            className="rounded p-1 hover:bg-zinc-700"
          >
            <X size={18} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-5 p-5">

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Collection Name
            </label>

            <input
              ref={inputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My API Collection"
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-orange-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm text-zinc-300">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Optional description..."
              className="w-full resize-none rounded-md border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-orange-500"
            />

          </div>

          {error && (
            <div className="rounded bg-red-500/10 p-2 text-sm text-red-400">
              {error}
            </div>
          )}

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-zinc-700 p-5">

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-md bg-zinc-700 px-5 py-2 hover:bg-zinc-600 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleCreate}
            disabled={!name.trim() || loading}
            className="rounded-md bg-orange-500 px-5 py-2 font-medium hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>

        </div>

      </div>

    </div>
  );
}