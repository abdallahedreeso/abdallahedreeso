import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

interface BootLine {
  text: string;
  type: "header" | "status" | "divider" | "ready";
}

const BOOT_LINES: BootLine[] = [
  { text: "ABDALLAH_EDREES OS [v2.4.0-release]", type: "header" },
  { text: "──────────────────────────────────────────────────", type: "divider" },
  { text: "INITIALIZING WEB OS...", type: "header" },
  { text: "Loading kernel v6.12.0-cyber", type: "status" },
  { text: "Mounting workspace modules", type: "status" },
  { text: "Initializing window manager", type: "status" },
  { text: "Loading user environment", type: "status" },
  { text: "SYSTEM READY", type: "ready" },
];

export function BootSequence({ onComplete }: BootSequenceProps) {
  const shouldReduceMotion = useReducedMotion();
  const [visibleCount, setVisibleCount] = useState<number>(
    shouldReduceMotion ? BOOT_LINES.length : 0
  );

  useEffect(() => {
    if (shouldReduceMotion) {
      const timer = setTimeout(() => {
        onComplete();
      }, 300);
      return () => clearTimeout(timer);
    }

    const intervalDelays = [0, 60, 120, 240, 360, 480, 600, 750];
    const timers: ReturnType<typeof setTimeout>[] = [];

    intervalDelays.forEach((delay, index) => {
      const timer = setTimeout(() => {
        setVisibleCount((prev) => Math.max(prev, index + 1));
      }, delay);
      timers.push(timer);
    });

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1050);
    timers.push(completeTimer);

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [onComplete, shouldReduceMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-[#030712] text-zinc-100 flex flex-col items-center justify-center p-4 font-mono select-none overflow-hidden"
      role="status"
      aria-live="polite"
      aria-label="Web OS Boot Sequence"
    >
      {/* OS Ambient Lighting & Cyber Grid overlay matching DesktopWorkspace */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293710_1px,transparent_1px),linear-gradient(to_bottom,#1f293710_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Terminal Screen Container */}
      <div className="relative w-full max-w-lg p-6 rounded-2xl bg-zinc-950/80 backdrop-blur-xl border border-cyan-500/20 shadow-[0_0_50px_rgba(6,182,212,0.1)] space-y-3">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-2 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-mono text-[10px] text-zinc-400">boot.sys</span>
          </div>
          <span className="text-[10px] text-cyan-400/80 tracking-wider uppercase font-semibold">Web OS Boot v2.4</span>
        </div>

        {/* Boot Logs */}
        <div className="space-y-1.5 min-h-[220px]">
          {BOOT_LINES.slice(0, visibleCount).map((line, idx) => {
            if (line.type === "divider") {
              return (
                <div key={idx} className="text-zinc-700 text-xs truncate">
                  {line.text}
                </div>
              );
            }

            if (line.type === "header") {
              return (
                <div
                  key={idx}
                  className={`text-xs md:text-sm font-semibold tracking-wide ${
                    idx === 0 ? "text-cyan-400" : "text-zinc-300 mt-2"
                  }`}
                >
                  {line.text}
                </div>
              );
            }

            if (line.type === "status") {
              return (
                <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                  <span className="text-emerald-400 font-bold">[OK]</span>
                  <span>{line.text}</span>
                </div>
              );
            }

            if (line.type === "ready") {
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 text-sm font-bold tracking-wider text-cyan-400">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span>SYSTEM READY</span>
                  </div>
                  <span className="text-[10px] text-zinc-400">100% INITIALIZED</span>
                </motion.div>
              );
            }

            return null;
          })}
        </div>

        {/* Bottom micro status indicator */}
        <div className="pt-2 flex items-center justify-between text-[10px] text-zinc-400 font-mono border-t border-zinc-800/40">
          <span>ARCH: x86_64-WEB</span>
          <span>LATENCY: &lt;1ms</span>
        </div>
      </div>
    </motion.div>
  );
}
