import React, { useState, useEffect } from "react";
import { useIDEStore, ideStore } from "@/store/useIDEStore";

export const IDECommandPalette: React.FC = () => {
  const isOpen = useIDEStore((state) => state.commandPaletteOpen);
  const files = useIDEStore((state) => state.files);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        ideStore.setCommandPaletteOpen(!isOpen);
      } else if (e.key === "Escape" && isOpen) {
        ideStore.setCommandPaletteOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredFiles = files.filter(
    (f) =>
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-start justify-center pt-24 px-4">
      {/* Overlay click to dismiss */}
      <div
        className="fixed inset-0"
        onClick={() => ideStore.setCommandPaletteOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-slate-900/95 border border-cyan-500/40 rounded-xl shadow-2xl shadow-cyan-500/20 overflow-hidden font-mono z-10">
        {/* Input */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800">
          <svg
            className="w-4 h-4 text-cyan-400 mr-3 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            autoFocus
            placeholder="Type a file name or system command..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => ideStore.setCommandPaletteOpen(false)}
            className="text-xs text-slate-500 hover:text-slate-300 px-1.5 py-0.5 rounded border border-slate-800"
          >
            ESC
          </button>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto p-2 divide-y divide-slate-800/50">
          <div className="px-2 py-1 text-[10px] text-cyan-400 uppercase font-semibold">
            Files in Workspace
          </div>
          {filteredFiles.map((file) => (
            <button
              key={file.id}
              onClick={() => {
                ideStore.openFile(file.id);
                ideStore.setCommandPaletteOpen(false);
              }}
              className="w-full text-left flex items-center justify-between px-3 py-2 rounded-lg hover:bg-cyan-950/60 hover:text-cyan-200 transition-colors group"
            >
              <div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                  {file.name}
                </div>
                <div className="text-[11px] text-slate-400 truncate max-w-md">
                  {file.description}
                </div>
              </div>
              <span className="text-[10px] text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded group-hover:border-cyan-500/40">
                Open
              </span>
            </button>
          ))}

          {/* Quick System Actions */}
          <div className="pt-2 px-2 py-1 text-[10px] text-purple-400 uppercase font-semibold">
            Quick Actions
          </div>
          <button
            onClick={() => {
              ideStore.toggleSidebar();
              ideStore.setCommandPaletteOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-purple-950/40 rounded-lg"
          >
            Toggle Primary Sidebar (Ctrl+B)
          </button>
          <button
            onClick={() => {
              ideStore.closeAllTabs();
              ideStore.setCommandPaletteOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-xs text-rose-300 hover:bg-rose-950/40 rounded-lg"
          >
            Close All Open Tabs
          </button>
        </div>
      </div>
    </div>
  );
};
