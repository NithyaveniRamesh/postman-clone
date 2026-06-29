"use client";

import Editor from "@monaco-editor/react";

interface Props {
  response: any;
}

export default function PrettyView({
  response,
}: Props) {

  if (!response)
    return (
      <div className="p-10 text-zinc-500">
        Send a request to view the response.
      </div>
    );

  return (

    <div className="h-full">

      <Editor

        height="100%"

        language="json"

        theme="vs-dark"

        options={{
          readOnly: true,
          minimap: {
            enabled: false,
          },
        }}

        value={response.body}

      />

    </div>

  );

}