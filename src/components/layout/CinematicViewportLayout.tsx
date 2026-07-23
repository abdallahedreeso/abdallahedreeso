import React, { useEffect } from 'react';
import { SceneCanvas } from '@/components/canvas/SceneCanvas';
import { BentoAssemblyGrid } from '@/components/bento/BentoAssemblyGrid';
import { TimelineScrubber } from '@/components/timeline/TimelineScrubber';
import { useTimelineStore, TIMELINE_SECTIONS } from '@/store/useTimelineStore';
import { Film, Activity, Volume2, VolumeX, Code } from 'lucide-react';

export const CinematicViewportLayout: React.FC = () => {
  const progress = useTimelineStore((state) => state.progress);
  const activeSectionId = useTimelineStore((state) => state.activeSectionId);
  const setProgress = useTimelineStore((state) => state.setProgress);
  const togglePlaying = useTimelineStore((state) => state.togglePlaying);

  const activeSection = TIMELINE_SECTIONS.find((s) => s.id === activeSectionId) || TIMELINE_SECTIONS[0];

  // Intercept Wheel Gestures and translate vertical wheel scrolling into timeline progress scrubbing
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const sensitivity = 0.0004;
      const deltaProgress = e.deltaY * sensitivity;
      setProgress((prev) => Math.max(0, Math.min(1, prev + deltaProgress)));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlaying();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        setProgress((prev) => Math.min(1, prev + 0.02));
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        setProgress((prev) => Math.max(0, prev - 0.02));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setProgress, togglePlaying]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 select-none font-sans">
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between pointer-events-none">
        {/* Brand Logo & Architecture Designation */}
        <div className="flex items-center space-x-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Film className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <div>
            <h1 className="font-mono text-sm font-bold tracking-tight text-slate-100 flex items-center space-x-2">
              <span>ABDALLAH EDREES</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-normal">
                v2.4 SPATIAL
              </span>
            </h1>
            <p className="text-[11px] font-mono text-slate-400">Cinematic Scrubber Architecture</p>
          </div>
        </div>

        {/* Audio Visualizer & System Status Pills */}
        <div className="flex items-center space-x-4 pointer-events-auto">
          <div className="hidden sm:flex items-center space-x-2 bg-slate-900/80 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-mono text-slate-300 shadow-sm">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>SCRUBBER: {Math.round(progress * 100)}%</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-mono text-cyan-400 font-semibold shadow-sm">
            {activeSection.label}
          </div>
        </div>
      </header>

      {/* R3F WebGL 3D Background Canvas */}
      <SceneCanvas />

      {/* DOM 3D Bento Assembly Overlay */}
      <BentoAssemblyGrid />

      {/* Bottom Fixed Premiere-Style Timeline Scrubber Toolbar */}
      <TimelineScrubber />
    </div>
  );
};
