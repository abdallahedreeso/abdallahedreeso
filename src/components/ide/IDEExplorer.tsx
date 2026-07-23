import React, { useState } from "react";
import { useIDEStore, ideStore, FileItem } from "@/store/useIDEStore";

export const IDEExplorer: React.FC = () => {
  const files = useIDEStore((state) => state.files);
  const activeTabId = useIDEStore((state) => state.activeTabId);
  const openTabIds = useIDEStore((state) => state.openTabIds);
  const activeSidebarView = useIDEStore((state) => state.activeSidebarView);
  const searchQuery = useIDEStore((state) => state.searchQuery);

  const [folderExpanded, setFolderExpanded] = useState(true);

  // Helper for file extension badge styling & icon
  const getFileBadge = (ext: FileItem["extension"]) => {
    switch (ext) {
      case "tsx":
        return { label: "TSX", color: "text-sky-400 bg-sky-950/60 border-sky-500/30" };
      case "md":
        return { label: "MD", color: "text-emerald-400 bg-emerald-950/60 border-emerald-500/30" };
      case "json":
        return { label: "JSON", color: "text-amber-400 bg-amber-950/60 border-amber-500/30" };
      case "env":
        return { label: "ENV", color: "text-purple-400 bg-purple-950/60 border-purple-500/30" };
      case "draw":
        return { label: "RAW", color: "text-pink-400 bg-pink-950/60 border-pink-500/30" };
      default:
        return { label: "TXT", color: "text-slate-400 bg-slate-900 border-slate-700" };
    }
  };

  const filteredFiles = files.filter((f) =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-64 bg-slate-950/70 backdrop-blur-lg border-r border-cyan-500/20 flex flex-col h-full z-10 select-none text-xs text-slate-300">
      {/* Sidebar Section Title */}
      <div className="h-9 px-3 border-b border-slate-800/80 flex items-center justify-between font-mono font-semibold tracking-wider text-[11px] text-cyan-400">
        <span className="uppercase">
          {activeSidebarView === "explorer" && "EXPLORER"}
          {activeSidebarView === "search" && "SEARCH"}
          {activeSidebarView === "git" && "SOURCE CONTROL"}
          {activeSidebarView === "settings" && "SETTINGS"}
        </span>
        <span className="text-[10px] text-slate-500 font-normal">v2.4.0</span>
      </div>

      {/* Explorer Content View */}
      {activeSidebarView === "explorer" && (
        <div className="flex-1 overflow-y-auto py-2">
          {/* Workspace Root Node */}
          <div className="px-2 mb-1">
            <button
              onClick={() => setFolderExpanded(!folderExpanded)}
              className="w-full flex items-center space-x-1.5 py-1 px-1.5 rounded hover:bg-slate-900/60 text-slate-300 font-mono font-medium text-[11px]"
            >
              <svg
                className={`w-3.5 h-3.5 text-cyan-400 transition-transform ${
                  folderExpanded ? "rotate-90" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-cyan-300 font-bold uppercase tracking-wide">PORTFOLIO-ARCHITECT</span>
            </button>
          </div>

          {folderExpanded && (
            <div className="pl-4 pr-2 space-y-0.5">
              <div className="py-0.5 px-2 text-[10px] text-slate-500 font-mono flex items-center space-x-1">
                <span>📁</span>
                <span>src / views</span>
              </div>

              {/* File List Items */}
              {filteredFiles.map((file) => {
                const isActive = activeTabId === file.id;
                const isOpen = openTabIds.includes(file.id);
                const badge = getFileBadge(file.extension);

                return (
                  <div
                    key={file.id}
                    onClick={() => ideStore.openFile(file.id)}
                    className={`group relative flex items-center justify-between py-1.5 px-2.5 rounded-md cursor-pointer transition-all ${
                      isActive
                        ? "bg-cyan-950/70 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20"
                        : isOpen
                        ? "text-slate-200 hover:bg-slate-900/70 hover:text-cyan-200"
                        : "text-slate-400 hover:bg-slate-900/40 hover:text-slate-200"
                    }`}
                  >
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-cyan-400 rounded-r" />
                    )}

                    <div className="flex items-center space-x-2 min-w-0">
                      <span
                        className={`text-[9px] font-mono px-1 py-0.5 rounded border ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                      <span className="font-mono text-[12px] truncate">{file.name}</span>
                    </div>

                    <div className="flex items-center space-x-1">
                      {isOpen && (
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-cyan-400/80"
                          title="Open tab"
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Outline Specs */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 px-3 font-mono">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2">
              SYSTEM SPECS
            </span>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div className="flex justify-between">
                <span className="text-slate-500">Framework:</span>
                <span className="text-cyan-400 font-medium">React 18 + TS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Backdrop:</span>
                <span className="text-purple-400 font-medium">Continuous 3D</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">State Engine:</span>
                <span className="text-emerald-400 font-medium">Custom Reactive</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar View */}
      {activeSidebarView === "search" && (
        <div className="p-3 space-y-3">
          <input
            type="text"
            placeholder="Search filenames or keywords..."
            value={searchQuery}
            onChange={(e) => ideStore.setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-cyan-500/30 rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
          <div className="text-[11px] font-mono text-slate-400">
            Found {filteredFiles.length} file(s) matching query.
          </div>
        </div>
      )}

      {/* Git / Source Control View */}
      {activeSidebarView === "git" && (
        <div className="p-3 space-y-3 font-mono text-xs">
          <div className="p-2 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-300">
            Branch: <span className="font-bold">main*</span> (clean state)
          </div>
          <div className="text-slate-400 text-[11px]">
            No uncommitted changes in active workspace tree.
          </div>
        </div>
      )}

      {/* Settings View */}
      {activeSidebarView === "settings" && (
        <div className="p-3 space-y-3 text-xs font-mono text-slate-300">
          <div className="text-cyan-400 font-semibold mb-2">IDE PREFERENCES</div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked readOnly className="accent-cyan-500" />
              <span>Glassmorphic Backdrop</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked readOnly className="accent-cyan-500" />
              <span>Suspense Lazy Loading</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input type="checkbox" checked readOnly className="accent-cyan-500" />
              <span>Bundle Budget Guard (&lt;101 kB)</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
