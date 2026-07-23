import React from "react";
import { useIDEStore, ideStore } from "@/store/useIDEStore";

export const IDEActivityBar: React.FC = () => {
  const activeSidebarView = useIDEStore((state) => state.activeSidebarView);
  const isSidebarOpen = useIDEStore((state) => state.isSidebarOpen);
  const soundEnabled = useIDEStore((state) => state.soundEnabled);

  return (
    <aside className="w-12 bg-slate-950/90 backdrop-blur-md border-r border-cyan-500/20 flex flex-col justify-between items-center py-3 z-20 select-none shrink-0">
      {/* Top Activity Icons */}
      <div className="flex flex-col items-center space-y-3 w-full">
        {/* Explorer Button */}
        <button
          onClick={() => ideStore.setSidebarView("explorer")}
          className={`relative p-2.5 rounded-lg transition-all ${
            isSidebarOpen && activeSidebarView === "explorer"
              ? "text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 shadow-sm shadow-cyan-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
          title="Explorer (Ctrl+Shift+E)"
        >
          {isSidebarOpen && activeSidebarView === "explorer" && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r" />
          )}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </button>

        {/* Search Button */}
        <button
          onClick={() => ideStore.setSidebarView("search")}
          className={`relative p-2.5 rounded-lg transition-all ${
            isSidebarOpen && activeSidebarView === "search"
              ? "text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 shadow-sm shadow-cyan-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
          title="Search Workspace (Ctrl+Shift+F)"
        >
          {isSidebarOpen && activeSidebarView === "search" && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r" />
          )}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>

        {/* Source Control Button */}
        <button
          onClick={() => ideStore.setSidebarView("git")}
          className={`relative p-2.5 rounded-lg transition-all ${
            isSidebarOpen && activeSidebarView === "git"
              ? "text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 shadow-sm shadow-cyan-500/30"
              : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
          }`}
          title="Source Control (Git)"
        >
          {isSidebarOpen && activeSidebarView === "git" && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-cyan-400 rounded-r" />
          )}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </button>
      </div>

      {/* Bottom Utility Icons */}
      <div className="flex flex-col items-center space-y-3 w-full">
        {/* Sound FX Toggle */}
        <button
          onClick={() => ideStore.toggleSound()}
          className={`p-2.5 rounded-lg transition-colors ${
            soundEnabled
              ? "text-emerald-400 bg-emerald-950/40 border border-emerald-500/30"
              : "text-slate-500 hover:text-slate-300"
          }`}
          title={soundEnabled ? "Mute Audio Feedback" : "Enable Quantum Audio Feedback"}
        >
          {soundEnabled ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15zM17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>

        {/* Settings */}
        <button
          onClick={() => ideStore.setSidebarView("settings")}
          className={`p-2.5 rounded-lg transition-colors ${
            isSidebarOpen && activeSidebarView === "settings"
              ? "text-cyan-400 bg-cyan-950/60 border border-cyan-500/40"
              : "text-slate-400 hover:text-slate-200"
          }`}
          title="Settings"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </aside>
  );
};
