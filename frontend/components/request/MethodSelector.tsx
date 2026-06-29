"use client";

import { useRequestStore } from "@/store/requestStore";

const methods = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

export default function MethodSelector() {
  const { method, setMethod } = useRequestStore();

  return (
    <select
      value={method}
      onChange={(e) => setMethod(e.target.value)}
      className="w-28 rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm font-medium text-white outline-none"
    >
      {methods.map((m) => (
        <option key={m} value={m}>
          {m}
        </option>
      ))}
    </select>
  );
}