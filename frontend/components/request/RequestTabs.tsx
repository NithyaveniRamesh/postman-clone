"use client";

import { Plus } from "lucide-react";

export default function RequestTabs() {
  return (
    <div className="flex h-12 items-center border-b border-zinc-800 bg-zinc-900 px-2">

      <div className="mr-2 flex items-center rounded-t-md bg-zinc-800 px-4 py-2 text-sm">
        New Request
      </div>

      <button className="rounded-md p-2 hover:bg-zinc-800">
        <Plus size={18} />
      </button>

    </div>
  );
}