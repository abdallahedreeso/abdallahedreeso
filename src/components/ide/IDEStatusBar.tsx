import React from "react";
import { useIDEStore, ideStore } from "@/store/useIDEStore";

export const IDEStatusBar: React.FC = () => {
  const activeTabId = useIDEStore((state) => state.activeTabId);
  const files = useIDEStore((state) => state.files);
  const soundEnabled = useIDEStore((state) => state.soundEnabled);

  const activeFile = files.find((f) => f.id === activeTabId);

  return (
    <footer className="h-6 bg-slate-950/90 backdrop-blur-md border-t border-cyan-500/20 px-3 flex items-center justify-between text-[10px] font-mono text-slate-400 select-none z-20">
      {/* Left: Branch & Language info */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => ideStore.setSidebarView("git")}
          className="flex items-center space-x-1 hover:text-cyan-300 transition-colors"
        >
          <svg className="w-3 h-3 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <span className="font-semibold text-cyan-300">main*</span>
        </button>

        {activeFile && (
          <div className="hidden sm:flex items-center space-x-2 text-slate-400">
            <span>Size: {activeFile.size}</span>
            <span>•</span>
            <span className="uppercase text-cyan-400 font-semibold">{activeFile.language}</span>
          </div>
        )}
      </div>

      {/* Right: Engine metrics & Payload status */}
      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>FPS: 60 (WebGL Layer)</span>
        </div>

        <div className="flex items-center space-x-1 text-emerald-400 bg-emerald-950/40 px-1.5 py-0.5 rounded border border-emerald-500/30">
          <span>BUNDLE &lt;101.21 kB</span>
        </div>

        <button
          onClick={() => ideStore.toggleSound()}
          className="hover:text-cyan-300 transition-colors"
        >
          {soundEnabled ? "🔊 AUDIO ON" : "🔇 AUDIO MUTED"}
        </button>

        <span className="hidden lg:inline text-slate-500">UTF-8</span>
      </div>
    </footer>
  );
};
