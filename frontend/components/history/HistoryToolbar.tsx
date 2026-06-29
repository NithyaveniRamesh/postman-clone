"use client";

import { RotateCcw, Trash2 } from "lucide-react";

interface Props {
  onRefresh: () => void;
  onClear: () => void;
}

export default function HistoryToolbar({
  onRefresh,
  onClear,
}: Props) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-800 p-3">

      <h3 className="font-semibold">
        History
      </h3>

      <div className="flex gap-2">

        <button
          onClick={onRefresh}
          className="rounded p-2 hover:bg-zinc-700"
        >
          <RotateCcw size={16} />
        </button>

        <button
          onClick={onClear}
          className="rounded p-2 hover:bg-zinc-700"
        >
          <Trash2 size={16} />
        </button>

      </div>

    </div>
  );
}