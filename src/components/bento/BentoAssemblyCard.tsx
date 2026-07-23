import React, { useEffect, useState } from 'react';
import { useTimelineStore } from '@/store/useTimelineStore';
import { ExternalLink, Github, Sparkles, Terminal, Code2, Cpu, Mail, ArrowUpRight } from 'lucide-react';

interface BentoCardProps {
  sectionId: string;
  startKeyframe: number; // 0.0 - 1.0
  endKeyframe: number;   // 0.0 - 1.0
  title: string;
  subtitle: string;
  badge?: string;
  children: React.ReactNode;
  className?: string;
}

export const BentoAssemblyCard: React.FC<BentoCardProps> = ({
  sectionId,
  startKeyframe,
  endKeyframe,
  title,
  subtitle,
  badge,
  children,
  className = '',
}) => {
  const [styleState, setStyleState] = useState<{
    opacity: number;
    transform: string;
    pointerEvents: 'auto' | 'none';
  }>({
    opacity: 0,
    transform: 'translate3d(0px, 0px, -1200px) rotateX(35deg) rotateY(-20deg)',
    pointerEvents: 'none',
  });

  useEffect(() => {
    // Subscribe directly to Zustand progress without triggering parent React re-renders
    const unsubscribe = useTimelineStore.getState().subscribeProgress((progress) => {
      const windowWidth = endKeyframe - startKeyframe;
      const fadeInEnd = startKeyframe + windowWidth * 0.25;
      const fadeOutStart = endKeyframe - windowWidth * 0.25;

      let opacity = 0;
      let translateZ = -1200;
      let translateY = 80;
      let rotateX = 25;
      let rotateY = -15;

      if (progress < startKeyframe) {
        // Before entrance
        const delta = (startKeyframe - progress) / startKeyframe || 0;
        opacity = Math.max(0, 1 - delta * 4);
        translateZ = -1200 - delta * 500;
        translateY = 120;
        rotateX = 35;
      } else if (progress >= startKeyframe && progress <= fadeInEnd) {
        // Assembling into view
        const norm = (progress - startKeyframe) / (fadeInEnd - startKeyframe);
        opacity = norm;
        translateZ = -1200 * (1 - norm);
        translateY = 80 * (1 - norm);
        rotateX = 25 * (1 - norm);
        rotateY = -15 * (1 - norm);
      } else if (progress > fadeInEnd && progress < fadeOutStart) {
        // Active display lock
        opacity = 1;
        translateZ = 0;
        translateY = 0;
        rotateX = 0;
        rotateY = 0;
      } else if (progress >= fadeOutStart && progress <= endKeyframe) {
        // Disassembling out of view
        const norm = (progress - fadeOutStart) / (endKeyframe - fadeOutStart);
        opacity = 1 - norm;
        translateZ = 800 * norm;
        translateY = -80 * norm;
        rotateX = -25 * norm;
        rotateY = 15 * norm;
      } else {
        // After exit
        opacity = 0;
        translateZ = 1200;
        translateY = -120;
      }

      setStyleState({
        opacity: Math.min(1, Math.max(0, opacity)),
        transform: `perspective(1000px) translate3d(0px, ${translateY}px, ${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        pointerEvents: opacity > 0.6 ? 'auto' : 'none',
      });
    });

    // Run initial calculation once
    useTimelineStore.getState().setProgress((p) => p);

    return unsubscribe;
  }, [startKeyframe, endKeyframe]);

  return (
    <div
      style={{
        opacity: styleState.opacity,
        transform: styleState.transform,
        pointerEvents: styleState.pointerEvents,
        willChange: 'transform, opacity',
        transition: 'transform 0.08s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.08s ease-out',
      }}
      className={`absolute inset-x-4 top-16 bottom-24 md:inset-x-12 md:top-20 md:bottom-28 max-w-6xl mx-auto flex flex-col justify-center select-text ${className}`}
    >
      <div className="bg-slate-900/85 border border-slate-800/90 backdrop-blur-2xl rounded-2xl p-6 md:p-8 shadow-2xl shadow-cyan-950/40 relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
        {/* Glow Accent Corner */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all pointer-events-none" />

        {/* Card Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-xl md:text-2xl font-bold font-mono tracking-tight text-slate-100">
              {title}
            </h2>
          </div>
          {badge && (
            <span className="px-3 py-1 text-xs font-mono font-medium rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
              {badge}
            </span>
          )}
        </div>

        <p className="text-slate-400 text-xs md:text-sm font-mono mb-6">{subtitle}</p>

        {/* Card Content Area */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};
