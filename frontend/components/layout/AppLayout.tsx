"use client";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import Workspace from "./Workspace";

export default function AppLayout() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#1E1E1E] text-white">

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex flex-1 flex-col">

        <TopBar />

        <Workspace />

      </div>

    </div>
  );
}