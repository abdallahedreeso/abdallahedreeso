import React, { lazy, Suspense } from 'react';

// Async dynamic chunk split for WebGL 3D Canvas
const Spatial3DCanvas = lazy(() => import('./Spatial3DCanvas'));

const CanvasFallbackLoader: React.FC = () => (
  <div className="absolute inset-0 z-0 bg-slate-950 flex items-center justify-center pointer-events-none">
    <div className="flex flex-col items-center space-y-3">
      <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
      <span className="text-xs font-mono text-cyan-400/80 tracking-widest uppercase">
        Initializing 3D Spatial Canvas...
      </span>
    </div>
  </div>
);

export const SceneCanvas: React.FC = () => {
  return (
    <Suspense fallback={<CanvasFallbackLoader />}>
      <Spatial3DCanvas />
    </Suspense>
  );
};
