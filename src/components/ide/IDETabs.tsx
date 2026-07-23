import React from "react";
import { useIDEStore, ideStore, FileItem } from "@/store/useIDEStore";

export const IDETabs: React.FC = () => {
  const openTabIds = useIDEStore((state) => state.openTabIds);
  const activeTabId = useIDEStore((state) => state.activeTabId);
  const files = useIDEStore((state) => state.files);
  const editorMode = useIDEStore((state) => state.editorMode);

  const getFileBadge = (ext: FileItem["extension"]) => {
    switch (ext) {
      case "tsx":
        return { label: "TSX", color: "text-sky-400" };
      case "md":
        return { label: "MD", color: "text-emerald-400" };
      case "json":
        return { label: "JSON", color: "text-amber-400" };
      case "env":
        return { label: "ENV", color: "text-purple-400" };
      case "draw":
        return { label: "RAW", color: "text-pink-400" };
      default:
        return { label: "TXT", color: "text-slate-400" };
    }
  };

  return (
    <div className="h-9 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 flex items-center justify-between px-2 select-none z-10 overflow-x-auto scrollbar-none">
      {/* Left: Tab list */}
      <div className="flex items-center space-x-1 h-full min-w-0">
        {openTabIds.map((tabId) => {
          const file = files.find((f) => f.id === tabId);
          if (!file) return null;

          const isActive = activeTabId === tabId;
          const badge = getFileBadge(file.extension);

          return (
            <div
              key={file.id}
              onClick={() => ideStore.setActiveTab(file.id)}
              className={`group relative h-full flex items-center space-x-2 px-3 border-r border-slate-800/80 cursor-pointer font-mono text-xs transition-all ${
                isActive
                  ? "bg-slate-900/90 text-cyan-300 font-medium border-t-2 border-t-cyan-400 shadow-sm"
                  : "bg-slate-950/50 text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"
              }`}
            >
              <span className={`text-[10px] font-semibold ${badge.color}`}>
                {badge.label}
              </span>
              <span className="truncate max-w-[120px] sm:max-w-[160px]">{file.name}</span>

              {/* Tab close button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  ideStore.closeTab(file.id);
                }}
                className="opacity-60 group-hover:opacity-100 p-0.5 hover:bg-slate-800 hover:text-rose-400 rounded transition-colors"
                title="Close Tab"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          );
        })}

        {openTabIds.length === 0 && (
          <div className="px-3 text-slate-500 font-mono text-xs italic">
            No tabs open
          </div>
        )}
      </div>

      {/* Right: Render / Code Mode Switcher */}
      <div className="flex items-center space-x-1 pl-2 shrink-0">
        <button
          onClick={() => ideStore.setEditorMode("render")}
          className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
            editorMode === "render"
              ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          title="Interactive Rendered View"
        >
          ⚡ Render View
        </button>
        <button
          onClick={() => ideStore.setEditorMode("code")}
          className={`px-2 py-0.5 text-[11px] font-mono rounded transition-colors ${
            editorMode === "code"
              ? "bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 shadow-sm"
              : "text-slate-400 hover:text-slate-200"
          }`}
          title="Raw Source View"
        >
          &lt;/&gt; Code View
        </button>
      </div>
    </div>
  );
};
