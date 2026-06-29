"use client";

import { useRequestStore } from "@/store/requestStore";

export default function Authorization() {

  const {
    authType,
    authValue,
    setAuthType,
    setAuthValue,
  } = useRequestStore();

  return (

    <div className="space-y-5 p-6">

      <select
        value={authType}
        onChange={(e) =>
          setAuthType(
            e.target.value
          )
        }
        className="rounded border border-zinc-700 bg-zinc-900 p-3"
      >

        <option>None</option>

        <option>Bearer</option>

        <option>Basic</option>

      </select>

      {authType !== "None" && (

        <input
          value={authValue}
          onChange={(e) =>
            setAuthValue(
              e.target.value
            )
          }
          placeholder="Token or username:password"
          className="w-full rounded border border-zinc-700 bg-zinc-900 p-3"
        />

      )}

    </div>

  );

}