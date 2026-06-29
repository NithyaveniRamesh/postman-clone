"use client";

import { Plus, Search } from "lucide-react";

export default function SidebarHeader() {

  return (

    <div className="border-b border-zinc-800 p-4">

      <div className="flex items-center justify-between">

        <h2 className="font-bold text-orange-500">

          Postman Clone

        </h2>

        <button className="rounded p-1 hover:bg-zinc-700">

          <Plus size={18} />

        </button>

      </div>

      <div className="relative mt-3">

        <Search
          className="absolute left-3 top-2.5"
          size={16}
        />

        <input
          placeholder="Search..."
          className="w-full rounded-md bg-zinc-800 py-2 pl-9 pr-2 text-sm outline-none"
        />

      </div>

    </div>

  );

}