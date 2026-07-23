import React from "react";
import { useIDEStore, ideStore } from "@/store/useIDEStore";
import { CyberCanvas } from "./CyberCanvas";
import { IDEHeader } from "./IDEHeader";
import { IDEActivityBar } from "./IDEActivityBar";
import { IDEExplorer } from "./IDEExplorer";
import { IDETabs } from "./IDETabs";
import { IDEEditor } from "./IDEEditor";
import { IDEStatusBar } from "./IDEStatusBar";
import { IDECommandPalette } from "./IDECommandPalette";

export const IDELayout: React.FC = () => {
  const isSidebarOpen = useIDEStore((state) => state.isSidebarOpen);
  const activeTabId = useIDEStore((state) => state.activeTabId);
  const files = useIDEStore((state) => state.files);

  const activeFile = files.find((f) => f.id === activeTabId);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 flex flex-col font-sans select-none">
      {/* Fixed 3D WebGL Canvas Backdrop */}
      <CyberCanvas />

      {/* Glassmorphic IDE Layout Shell Container */}
      <div className="relative z-10 flex flex-col w-full h-full">
        {/* IDE Window Header */}
        <IDEHeader
          activeFileName={activeFile?.name}
          onOpenCommandPalette={() => ideStore.setCommandPaletteOpen(true)}
          onToggleSidebar={() => ideStore.toggleSidebar()}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main Body Area: Activity Bar + Explorer + Editor Stage */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Left Activity Bar */}
          <IDEActivityBar />

          {/* Left File Explorer Sidebar */}
          {isSidebarOpen && <IDEExplorer />}

          {/* Main Stage: Tabs + Editor Content View */}
          <main className="flex-1 flex flex-col min-w-0 bg-slate-950/40 backdrop-blur-md relative">
            <IDETabs />
            <div className="flex-1 overflow-hidden relative">
              <IDEEditor />
            </div>
          </main>
        </div>

        {/* IDE Bottom Status Bar */}
        <IDEStatusBar />
      </div>

      {/* Global Command Palette Modal (Ctrl+K) */}
      <IDECommandPalette />
    </div>
  );
};

export default IDELayout;
