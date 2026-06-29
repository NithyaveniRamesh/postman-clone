"use client";

import { useRequestStore } from "@/store/requestStore";
import { useHistory } from "@/hooks/useHistory";

import HistoryToolbar from "./HistoryToolbar";
import HistoryItem from "./HistoryItem";

export default function HistorySidebar() {

  console.log("HistorySidebar Rendered");

  const { history, loading, loadHistory, removeItem, clearAll } = useHistory();

  console.log("History Data:", history);

  const { setMethod, setUrl, setBody } = useRequestStore();

  function loadRequest(item: any) {
    setMethod(item.method);
    setUrl(item.url);
    setBody(item.request_body ?? "");
  }

  return (
    <div className="flex h-full flex-col">
      <HistoryToolbar onRefresh={loadHistory} onClear={clearAll} />

      {loading && <div className="p-4 text-sm">Loading...</div>}

      {!loading && history.length === 0 && (
        <div className="p-4 text-sm text-zinc-500">No History</div>
      )}

      <div className="flex-1 overflow-auto">
        {history.map((item) => (
          <HistoryItem
            key={item.id}
            item={item}
            onDelete={removeItem}
            onSelect={loadRequest}
          />
        ))}
      </div>
    </div>
  );
}
