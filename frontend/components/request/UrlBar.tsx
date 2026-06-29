"use client";

import { useState } from "react";
import { Play, Save } from "lucide-react";

import { useRequestStore } from "@/store/requestStore";
import { useResponseStore } from "@/store/responseStore";
import { sendRequest } from "@/services/runner";
import { useHistory } from "@/hooks/useHistory";

import SaveRequestDialog from "./SaveRequestDialog";

const METHODS = [
  "GET",
  "POST",
  "PUT",
  "PATCH",
  "DELETE",
  "HEAD",
  "OPTIONS",
];

export default function UrlBar() {
  const {
    method,
    url,
    params,
    headers,
    body,
    authType,
    authValue,
    setMethod,
    setUrl,
  } = useRequestStore();

  const {
    setResponse,
    setLoading,
  } = useResponseStore();

  const { loadHistory } = useHistory();

  const [showSaveDialog, setShowSaveDialog] =
    useState(false);

  async function handleSend() {
    try {
      setLoading(true);

      const res = await sendRequest({
        method,
        url,
        params,
        headers,
        body,
        body_type: "raw",
        auth_type: authType,
        auth_value: authValue,
      });

      setResponse(res.data);

      await loadHistory();
    } catch (err: any) {
      console.error(err);

      alert(
        err.response?.data?.detail ??
          "Request Failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex gap-2 border-b border-zinc-800 bg-[#1F1F1F] p-3">

        <select
          value={method}
          onChange={(e) =>
            setMethod(e.target.value)
          }
          className="rounded border border-zinc-700 bg-zinc-900 px-3"
        >
          {METHODS.map((m) => (
            <option key={m}>
              {m}
            </option>
          ))}
        </select>

        <input
          value={url}
          onChange={(e) =>
            setUrl(e.target.value)
          }
          placeholder="Enter URL..."
          className="flex-1 rounded border border-zinc-700 bg-zinc-900 px-3 outline-none"
        />

        {/* SAVE */}

        <button
          onClick={() =>
            setShowSaveDialog(true)
          }
          className="flex items-center gap-2 rounded bg-zinc-700 px-4 font-medium hover:bg-zinc-600"
        >
          <Save size={16} />
          Save
        </button>

        {/* SEND */}

        <button
          onClick={handleSend}
          className="flex items-center gap-2 rounded bg-orange-500 px-5 font-medium hover:bg-orange-600"
        >
          <Play size={16} />
          Send
        </button>

      </div>

      <SaveRequestDialog
        open={showSaveDialog}
        onClose={() =>
          setShowSaveDialog(false)
        }
      />
    </>
  );
}