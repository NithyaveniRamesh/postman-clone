"use client";

import { useState } from "react";

import EditorTabs from "./EditorTabs";

import ParamsTable from "./ParamsTable";

import HeadersTable from "./HeadersTable";

import BodyEditor from "./BodyEditor";

import Authorization from "./Authorization";

export default function RequestEditor() {

  const [tab, setTab] = useState("Params");

  return (

    <div className="flex flex-1 flex-col overflow-hidden">

      <EditorTabs
        active={tab}
        setActive={setTab}
      />

      <div className="flex-1 overflow-auto">

        {tab === "Params" && <ParamsTable />}

        {tab === "Headers" && <HeadersTable />}

        {tab === "Body" && <BodyEditor />}

        {tab === "Authorization" && <Authorization />}

      </div>

    </div>

  );

}