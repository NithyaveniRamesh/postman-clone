"use client";

import { useRequestStore } from "@/store/requestStore";

export default function UrlInput() {
  const { url, setUrl } = useRequestStore();

  return (
    <input
      type="text"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
      placeholder="Enter request URL..."
      className="flex-1 rounded-md border border-zinc-700 bg-zinc-900 px-4 py-2 text-white outline-none placeholder:text-zinc-500"
    />
  );
}