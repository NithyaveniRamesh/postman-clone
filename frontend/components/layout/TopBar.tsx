"use client";

import { Settings } from "lucide-react";

export default function TopBar() {

  return (

    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-[#202123] px-6">

      <h1 className="font-semibold">

        Workspace

      </h1>

      <div className="flex items-center gap-3">

        <select className="rounded border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm">

          <option>No Environment</option>

        </select>

        <button className="rounded p-2 hover:bg-zinc-700">

          <Settings size={18} />

        </button>

      </div>

    </header>

  );

}