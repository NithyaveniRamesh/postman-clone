"use client";

import Editor from "@monaco-editor/react";

import { useRequestStore } from "@/store/requestStore";

export default function BodyEditor() {

  const {
    body,
    setBody,
  } = useRequestStore();

  return (

    <div className="h-full">

      <Editor

        height="100%"

        defaultLanguage="json"

        theme="vs-dark"

        value={body}

        onChange={(value) =>
          setBody(value || "")
        }

      />

    </div>

  );

}