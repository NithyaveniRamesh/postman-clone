"use client";

import { Trash2 } from "lucide-react";
import { HistoryItem as HistoryType } from "@/store/historyStore";

interface Props {
  item: HistoryType;
  onDelete: (id: number) => void;
  onSelect: (item: HistoryType) => void;
}

export default function HistoryItem({
  item,
  onDelete,
  onSelect,
}: Props) {
  return (
    <div
      onClick={() => onSelect(item)}
      className="group cursor-pointer border-b border-zinc-800 p-3 hover:bg-zinc-800"
    >
      <div className="flex items-center justify-between">

        <span
          className={`rounded px-2 py-1 text-xs font-semibold ${
            item.method === "GET"
              ? "bg-green-600"
              : item.method === "POST"
              ? "bg-blue-600"
              : item.method === "PUT"
              ? "bg-yellow-600"
              : item.method === "DELETE"
              ? "bg-red-600"
              : "bg-gray-600"
          }`}
        >
          {item.method}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(item.id);
          }}
          className="hidden group-hover:block"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <p className="mt-2 truncate text-sm">
        {item.url}
      </p>

      <div className="mt-2 flex gap-3 text-xs text-zinc-400">
        <span>{item.status_code}</span>
        <span>{item.response_time} ms</span>
      </div>
    </div>
  );
}
