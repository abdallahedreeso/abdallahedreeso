import { useState, useEffect } from "react";
import { usePortfolioStore } from "@/store/use-portfolio-store";
import { ThemeToggle } from "@/components/theme-toggle";
import { Cpu, Wifi, ShieldCheck, Terminal } from "lucide-react";

export function TopBar() {
  const { windows, activeWindowId } = usePortfolioStore();
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeWindow = activeWindowId ? windows[activeWindowId] : null;

  return (
    <header className="h-9 w-full bg-white/70 dark:bg-zinc-950/80 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 px-4 flex items-center justify-between text-xs text-slate-700 dark:text-zinc-300 z-40 select-none transition-colors duration-300">
      {/* Left: Brand / System Status */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-bold tracking-wider text-cyan-600 dark:text-cyan-400">
          <Terminal className="w-3.5 h-3.5" />
          <span>EDREES.OS</span>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono">
            v2.6
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 text-slate-500 dark:text-zinc-400 border-l border-slate-200/80 dark:border-white/10 pl-3">
          <span className="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">ONLINE</span>
        </div>
      </div>

      {/* Center: Active Window Title */}
      <div className="hidden md:flex items-center gap-2 text-slate-700 dark:text-zinc-300 font-medium">
        {activeWindow ? (
          <div className="flex items-center gap-1.5 bg-slate-200/60 dark:bg-white/5 border border-slate-300/60 dark:border-white/10 px-2.5 py-0.5 rounded-full text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400" />
            <span>{activeWindow.title}</span>
          </div>
        ) : (
          <span className="text-slate-400 dark:text-zinc-500 text-[11px] font-mono">Desktop Active</span>
        )}
      </div>

      {/* Right: Controls & Time */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2.5 text-slate-500 dark:text-zinc-400">
          <div className="flex items-center gap-1 text-[11px] font-mono" title="System Protected">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-center gap-1 text-[11px] font-mono" title="CPU Normal">
            <Cpu className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          </div>
          <Wifi className="w-3.5 h-3.5 text-slate-600 dark:text-zinc-300" />
        </div>

        <div className="text-[11px] font-mono text-slate-800 dark:text-zinc-200 border-l border-slate-200/80 dark:border-white/10 pl-3">
          {timeStr || "12:00 PM"}
        </div>

        <div className="border-l border-slate-200/80 dark:border-white/10 pl-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
