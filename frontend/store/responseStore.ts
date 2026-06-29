import { create } from "zustand";

interface ResponseData {
  status_code: number;
  response_time: number;
  response_size: number;
  headers: Record<string, string>;
  body: string;
}

interface ResponseStore {
  loading: boolean;

  activeTab: "pretty" | "raw" | "headers";

  response: ResponseData | null;

  setLoading: (loading: boolean) => void;

  setResponse: (response: ResponseData) => void;

  setActiveTab: (
    tab: "pretty" | "raw" | "headers"
  ) => void;
}

export const useResponseStore =
create<ResponseStore>((set)=>({

    loading:false,

    response:null,

    activeTab:"pretty",

    setLoading:(loading)=>
        set({loading}),

    setResponse:(response)=>
        set({response}),

    setActiveTab:(activeTab)=>
        set({activeTab})

}));