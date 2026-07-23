import React from "react";

export const ArchitectureView: React.FC = () => {
  return (
    <div className="w-full max-w-4xl space-y-6 font-sans">
      {/* Header */}
      <div className="p-6 bg-slate-900/80 border border-pink-500/30 rounded-xl backdrop-blur-md">
        <div className="inline-flex items-center space-x-2 px-2.5 py-1 bg-pink-950/70 border border-pink-500/40 rounded-full text-pink-300 font-mono text-xs mb-2">
          <span>SYSTEM BLUEPRINT Architecture.draw</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
          System Architecture & Execution Layers
        </h1>
        <p className="text-sm font-mono text-slate-400 mt-1">
          Visual topology demonstrating WebGL background decoupling, React 18 Suspense chunk boundaries, and state flow.
        </p>
      </div>

      {/* Schematic Diagram */}
      <div className="p-6 bg-slate-950/90 border border-pink-500/20 rounded-xl font-mono text-xs text-slate-300 space-y-6 overflow-x-auto shadow-2xl">
        <div className="text-pink-400 font-bold border-b border-slate-800 pb-2">
          TOPOLOGY: Architectural Stack Layers
        </div>

        {/* Node 1: WebGL Backdrop */}
        <div className="p-4 bg-slate-900/90 border border-cyan-500/40 rounded-lg space-y-2 relative">
          <div className="text-cyan-400 font-bold flex items-center justify-between">
            <span>[ LAYER 0 ] Continuous WebGL Canvas Backdrop</span>
            <span className="text-[10px] bg-cyan-950 px-2 py-0.5 rounded">Z-INDEX: 0</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Fixed viewport canvas with particle nodes, interactive raycast mouse lighting, and zero layout shift.
          </p>
        </div>

        <div className="flex justify-center text-slate-600 font-bold text-lg">↓</div>

        {/* Node 2: IDE Layout Shell */}
        <div className="p-4 bg-slate-900/90 border border-purple-500/40 rounded-lg space-y-2 relative">
          <div className="text-purple-400 font-bold flex items-center justify-between">
            <span>[ LAYER 1 ] Glassmorphic IDE Layout Shell</span>
            <span className="text-[10px] bg-purple-950 px-2 py-0.5 rounded">Z-INDEX: 10</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            Tailwind CSS `backdrop-blur-md` panels with header command bar, left activity bar, file explorer tree, and tab controller.
          </p>
        </div>

        <div className="flex justify-center text-slate-600 font-bold text-lg">↓</div>

        {/* Node 3: Suspense Stage & Lazy Chunks */}
        <div className="p-4 bg-slate-900/90 border border-emerald-500/40 rounded-lg space-y-2 relative">
          <div className="text-emerald-400 font-bold flex items-center justify-between">
            <span>[ LAYER 2 ] Dynamic React.Suspense View Stage</span>
            <span className="text-[10px] bg-emerald-950 px-2 py-0.5 rounded">BUDGET: &lt;101.21 kB</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-2">
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[10px] text-center text-sky-400">
              Projects.tsx
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[10px] text-center text-emerald-400">
              About.md
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[10px] text-center text-amber-400">
              Skills.json
            </div>
            <div className="p-2 bg-slate-950 rounded border border-slate-800 text-[10px] text-center text-purple-400">
              Contact.env
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchitectureView;
