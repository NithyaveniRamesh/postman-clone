"use client";

import SidebarHeader from "../sidebar/SidebarHeader";
import CollectionsTree from "../sidebar/CollectionsTree";
import HistoryTree from "../sidebar/HistoryTree";
import { useState } from "react";

export default function Sidebar() {

  const [tab, setTab] = useState("collections");

  return (

    <aside className="flex w-72 flex-col border-r border-zinc-800 bg-[#202123]">

      <SidebarHeader />

      <div className="flex border-b border-zinc-800">

        <button
          onClick={() => setTab("collections")}
          className={`flex-1 py-3 text-sm ${
            tab === "collections"
              ? "border-b-2 border-orange-500 text-white"
              : "text-zinc-400"
          }`}
        >
          Collections
        </button>

        <button
          onClick={() => setTab("history")}
          className={`flex-1 py-3 text-sm ${
            tab === "history"
              ? "border-b-2 border-orange-500 text-white"
              : "text-zinc-400"
          }`}
        >
          History
        </button>

      </div>

      <div className="flex-1 overflow-auto">

        {tab === "collections"
          ? <CollectionsTree />
          : <HistoryTree />}

      </div>

    </aside>

  );

}