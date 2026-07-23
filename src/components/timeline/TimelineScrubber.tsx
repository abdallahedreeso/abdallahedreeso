import React, { useRef, useEffect, useCallback } from 'react';
import { useTimelineStore, TIMELINE_SECTIONS, formatSMPTETimecode } from '@/store/useTimelineStore';
import { Play, Pause, SkipBack, SkipForward, FastForward, RotateCcw } from 'lucide-react';

export const TimelineScrubber: React.FC = () => {
  const progress = useTimelineStore((state) => state.progress);
  const isPlaying = useTimelineStore((state) => state.isPlaying);
  const playbackSpeed = useTimelineStore((state) => state.playbackSpeed);
  const activeSectionId = useTimelineStore((state) => state.activeSectionId);
  const setProgress = useTimelineStore((state) => state.setProgress);
  const togglePlaying = useTimelineStore((state) => state.togglePlaying);
  const setPlaybackSpeed = useTimelineStore((state) => state.setPlaybackSpeed);
  const jumpToSection = useTimelineStore((state) => state.jumpToSection);

  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Playback animation loop
  useEffect(() => {
    if (!isPlaying) return;
    let animFrameId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const deltaSec = (now - lastTime) / 1000;
      lastTime = now;
      
      // Complete 100% of timeline in 45 seconds at 1x speed
      const totalDurationSec = 45;
      const progressDelta = (deltaSec * playbackSpeed) / totalDurationSec;

      setProgress((prev) => {
        if (prev >= 1) {
          useTimelineStore.getState().setIsPlaying(false);
          return 1;
        }
        return prev + progressDelta;
      });

      animFrameId = requestAnimationFrame(loop);
    };

    animFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameId);
  }, [isPlaying, playbackSpeed, setProgress]);

  // Compute progress from click/drag event
  const updateProgressFromEvent = useCallback(
    (e: React.PointerEvent | PointerEvent) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const rawProgress = clickX / rect.width;
      setProgress(Math.max(0, Math.min(1, rawProgress)));
    },
    [setProgress]
  );

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateProgressFromEvent(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      updateProgressFromEvent(e);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Fallback for edge cases
      }
    }
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 px-4 py-3 select-none text-slate-200 shadow-2xl">
      <div className="max-w-7xl mx-auto flex flex-col space-y-2">
        {/* Top Control Header */}
        <div className="flex items-center justify-between text-xs font-mono">
          {/* Transport Controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setProgress(0)}
              className="p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-slate-400 hover:text-white"
              title="Return to Start"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={togglePlaying}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-transform active:scale-95 shadow-lg shadow-cyan-500/20"
              title={isPlaying ? "Pause Timeline (Space)" : "Play Timeline (Space)"}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
            </button>
            <button
              onClick={() => setPlaybackSpeed(playbackSpeed === 1 ? 1.5 : playbackSpeed === 1.5 ? 2 : 1)}
              className="px-2 py-1 rounded bg-slate-900 border border-slate-700/60 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-colors text-[11px]"
              title="Playback Speed"
            >
              {playbackSpeed}x SPEED
            </button>
          </div>

          {/* Keyframe Section Indicators */}
          <div className="hidden md:flex items-center space-x-2">
            {TIMELINE_SECTIONS.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => jumpToSection(sec.id)}
                  className={`px-2.5 py-1 rounded-md transition-all text-[11px] border ${
                    isActive
                      ? 'bg-cyan-500/10 border-cyan-500/80 text-cyan-300 font-semibold shadow-sm shadow-cyan-500/20'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  }`}
                >
                  {sec.label}
                </button>
              );
            })}
          </div>

          {/* Timecode Counter */}
          <div className="flex items-center space-x-3">
            <span className="text-slate-400 hidden sm:inline">TIMELINE POSITION:</span>
            <div className="bg-slate-900 border border-slate-800 px-3 py-1 rounded font-mono text-cyan-400 font-bold text-sm tracking-wider shadow-inner">
              {formatSMPTETimecode(progress)}
            </div>
          </div>
        </div>

        {/* Timeline Scrubber Track Area */}
        <div
          ref={trackRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative h-10 w-full bg-slate-900/80 rounded-lg border border-slate-800 cursor-pointer overflow-hidden group touch-none"
        >
          {/* Ticks and Grid background */}
          <div className="absolute inset-0 flex justify-between items-end opacity-20 pointer-events-none px-2 pb-1">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className={`bg-slate-300 ${i % 5 === 0 ? 'h-3 w-0.5' : 'h-1.5 w-px'}`}
              />
            ))}
          </div>

          {/* Section Region Color Overlays */}
          {TIMELINE_SECTIONS.map((sec) => (
            <div
              key={sec.id}
              className={`absolute top-0 bottom-0 opacity-15 transition-opacity ${
                activeSectionId === sec.id ? 'opacity-30' : ''
              } bg-gradient-to-r ${sec.color}`}
              style={{
                left: `${sec.start * 100}%`,
                width: `${(sec.end - sec.start) * 100}%`,
              }}
            />
          ))}

          {/* Section Milestone Marker Lines & Pins */}
          {TIMELINE_SECTIONS.map((sec) => (
            <div
              key={`pin-${sec.id}`}
              className="absolute top-0 bottom-0 border-l border-slate-700/80 flex items-center pointer-events-none"
              style={{ left: `${sec.start * 100}%` }}
            >
              <div className="w-2 h-2 -ml-1 bg-slate-400 rounded-full opacity-60" />
            </div>
          ))}

          {/* Elapsed Progress Bar */}
          <div
            className="absolute top-0 bottom-0 bg-gradient-to-r from-cyan-600/40 via-blue-600/40 to-indigo-600/40 border-r border-cyan-400/50 pointer-events-none"
            style={{ width: `${progress * 100}%` }}
          />

          {/* Playhead Needle & Draggable Handle */}
          <div
            className="absolute top-0 bottom-0 z-20 flex flex-col items-center -ml-2 pointer-events-none transition-transform duration-75"
            style={{ left: `${progress * 100}%` }}
          >
            {/* Playhead Head Marker */}
            <div className="w-4 h-3 bg-cyan-400 shadow-lg shadow-cyan-500/80 rounded-t-sm clip-triangle flex items-center justify-center">
              <div className="w-1 h-1 bg-slate-950 rounded-full" />
            </div>
            {/* Vertical Laser Line */}
            <div className="w-0.5 flex-1 bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
