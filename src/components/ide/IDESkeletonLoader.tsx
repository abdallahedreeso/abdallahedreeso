import React from "react";

export const IDESkeletonLoader: React.FC = () => {
  return (
    <div className="w-full h-full p-6 flex flex-col space-y-4 font-mono select-none animate-pulse">
      {/* Header Loading Shimmer */}
      <div className="flex items-center space-x-3 pb-4 border-b border-slate-800/80">
        <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 animate-spin" />
        <div className="space-y-1.5 flex-1">
          <div className="h-4 w-48 bg-slate-800/80 rounded" />
          <div className="h-3 w-72 bg-slate-900/80 rounded" />
        </div>
      </div>

      {/* Code Line Gutter Placeholder */}
      <div className="space-y-3 pt-2">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <span className="w-6 text-right text-slate-700 text-xs">{i + 1}</span>
            <div
              className="h-3.5 bg-slate-800/60 rounded"
              style={{ width: `${Math.floor(Math.random() * 40 + 35)}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
