import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import { Terminal, ShieldCheck, Cpu, Zap, CheckCircle2 } from "lucide-react";

const BOOT_LOGS = [
  { text: "> INITIALIZING SYSTEM...", icon: Terminal, color: "text-cyan-400" },
  { text: "> VERIFYING SECURITY PROTOCOLS... [OK]", icon: ShieldCheck, color: "text-emerald-400" },
  { text: "> CALCULATING PAYLOAD: 24.52 kB... [OPTIMIZED]", icon: Cpu, color: "text-amber-400" },
  { text: "> GPU ACCELERATION... [ENGAGED]", icon: Zap, color: "text-sky-400" },
  { text: "> WELCOME.", icon: CheckCircle2, color: "text-green-400" },
];

export function BootSequence() {
  const { completeBoot } = usePortfolioStore();
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    // Reveal terminal logs sequentially every 320ms
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < BOOT_LOGS.length) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 320);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // When all lines are printed, wait 450ms then complete boot sequence
    if (visibleCount === BOOT_LOGS.length) {
      const timer = setTimeout(() => {
        completeBoot();
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [visibleCount, completeBoot]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.04,
        y: -15,
        filter: "blur(10px)",
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-[#030712] text-zinc-100 flex flex-col items-center justify-center p-6 select-none overflow-hidden font-mono"
    >
      {/* CRT Scanline & Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.3)_50%,rgba(0,0,0,0.3))] bg-[size:100%_4px] pointer-events-none opacity-40" />

      {/* Terminal Container Box */}
      <div className="w-full max-w-xl p-6 md:p-8 rounded-2xl bg-zinc-950/80 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] relative z-10 backdrop-blur-md">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 font-semibold text-zinc-300">ABDALLAH OS v2.4 BIOS</span>
          </div>
          <span className="text-cyan-400/80 animate-pulse">BOOTING</span>
        </div>

        {/* Boot Messages Output */}
        <div className="space-y-3 min-h-[160px] text-xs md:text-sm">
          {BOOT_LOGS.slice(0, visibleCount).map((log, index) => {
            const Icon = log.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 tracking-wide"
              >
                <Icon className={`w-4 h-4 shrink-0 ${log.color}`} />
                <span className={log.color}>{log.text}</span>
              </motion.div>
            );
          })}

          {/* Blinking Terminal Cursor */}
          {visibleCount < BOOT_LOGS.length && (
            <div className="flex items-center gap-2 text-cyan-400 pt-1">
              <span className="w-2 h-4 bg-cyan-400 animate-pulse inline-block" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-8 pt-4 border-t border-zinc-900">
          <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: `${(visibleCount / BOOT_LOGS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
