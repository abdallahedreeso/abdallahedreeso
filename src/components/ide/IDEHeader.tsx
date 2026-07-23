import React from "react";

interface IDEHeaderProps {
  activeFileName?: string;
  onOpenCommandPalette: () => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
}

export const IDEHeader: React.FC<IDEHeaderProps> = ({
  activeFileName,
  onOpenCommandPalette,
  onToggleSidebar,
  isSidebarOpen,
}) => {
  return (
    <header className="h-10 bg-slate-950/80 backdrop-blur-md border-b border-cyan-500/20 px-3 flex items-center justify-between text-xs text-slate-400 select-none z-20">
      {/* Left: Window controls & Sidebar Toggle */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-1.5 pr-2 border-r border-slate-800">
          <span className="w-3 h-3 rounded-full bg-rose-500/80 border border-rose-400/50 block shadow-sm shadow-rose-500/50 hover:opacity-80 cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 border border-amber-400/50 block shadow-sm shadow-amber-500/50 hover:opacity-80 cursor-pointer" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-400/50 block shadow-sm shadow-emerald-500/50 hover:opacity-80 cursor-pointer" />
        </div>

        <button
          onClick={onToggleSidebar}
          className={`p-1 rounded transition-colors ${
            isSidebarOpen
              ? "text-cyan-400 bg-cyan-950/40 border border-cyan-500/30"
              : "hover:text-slate-200 hover:bg-slate-800/50"
          }`}
          title="Toggle Primary Side Bar (Ctrl+B)"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        <div className="hidden sm:flex items-center space-x-1 text-slate-400 font-mono text-[11px]">
          <span className="text-cyan-400 font-semibold">architect-workspace</span>
          <span>/</span>
          <span className="text-slate-400">src</span>
          <span>/</span>
          <span className="text-slate-400">views</span>
          {activeFileName && (
            <>
              <span>/</span>
              <span className="text-cyan-300 font-medium">{activeFileName}</span>
            </>
          )}
        </div>
      </div>

      {/* Middle: Command Palette Quick Launch */}
      <button
        onClick={onOpenCommandPalette}
        className="flex items-center space-x-2 px-3 py-1 bg-slate-900/90 border border-slate-700/60 rounded-md text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all shadow-inner max-w-[220px] sm:max-w-[320px] w-full justify-between"
      >
        <div className="flex items-center space-x-1.5 truncate">
          <svg className="w-3.5 h-3.5 text-cyan-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span className="truncate text-[11px]">Search files or run commands...</span>
        </div>
        <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 text-slate-400 rounded border border-slate-700">
          Ctrl K
        </kbd>
      </button>

      {/* Right: Quantum Status & Indicators */}
      <div className="flex items-center space-x-3 text-[11px] font-mono">
        <div className="hidden md:flex items-center space-x-1.5 px-2 py-0.5 bg-emerald-950/40 border border-emerald-500/30 rounded text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>PAYLOAD: &lt;101.21 kB</span>
        </div>

        <div className="flex items-center space-x-1 text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-2 py-0.5 rounded">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="hidden lg:inline">QUANTUM ENGINE</span>
        </div>
      </div>
    </header>
  );
};
