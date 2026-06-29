"use client";

import RequestTabs from "../request/RequestTabs";
import UrlBar from "../request/UrlBar";
import RequestEditor from "../request/RequestEditor";
import ResponsePanel from "../response/ResponsePanel";

export default function Workspace() {

  return (

    <main className="flex flex-1 flex-col overflow-hidden">

      <RequestTabs />

      <UrlBar />

      <RequestEditor />

      <ResponsePanel />

    </main>

  );

}