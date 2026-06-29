"use client";

import { sendRequest } from "@/services/runner";
import { useRequestStore } from "@/store/requestStore";
import { useResponseStore } from "@/store/responseStore";
import toast from "react-hot-toast";

export default function SendButton() {
  const request = useRequestStore();

  const {
    setLoading,
    setResponse,
  } = useResponseStore();

  async function handleSend() {
    if (!request.url.trim()) {
      toast.error("Please enter a URL");
      return;
    }

    try {
      setLoading(true);

      const response = await sendRequest({
        method: request.method,
        url: request.url,
        params: request.params,
        headers: request.headers,
        body: request.body,
        body_type: "raw",
        auth_type: request.authType,
        auth_value: request.authValue,
        environment: {},
      });

      setResponse({
  status_code: response.status,
  response_time: 0,
  response_size: JSON.stringify(response.data).length,
  body: response.data,
  headers: response.headers,
});

      toast.success("Request completed");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.detail ??
          "Failed to send request"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleSend}
      className="rounded-md bg-orange-500 px-8 py-2 font-medium text-white hover:bg-orange-600"
    >
      Send
    </button>
  );
}
