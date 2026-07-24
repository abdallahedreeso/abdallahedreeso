import React, { useState } from "react";
import { motion, useDragControls } from "framer-motion";
import { usePortfolioStore, WindowId } from "@/store/use-portfolio-store";
import { useIsMobile } from "@/hooks/use-mobile";
import { WindowFocusProvider } from "@/components/os/window-focus-context";
import {
  X,
  Minus,
  Maximize2,
  Minimize2,
  Terminal,
  User,
  FolderGit2,
  Cpu,
  Mail,
} from "lucide-react";

interface WindowFrameProps {
  id: WindowId;
  children: React.ReactNode;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Terminal,
  User,
  FolderGit2,
  Cpu,
  Mail,
};

export function OSWindowFrame({ id, children }: WindowFrameProps) {
  const { windows, activeWindowId, closeWindow, minimizeWindow, toggleMaximizeWindow, focusWindow } =
    usePortfolioStore();
  const dragControls = useDragControls();
  const isMobile = useIsMobile();
  const [isDragging, setIsDragging] = useState(false);

  const win = windows[id];

  if (!win || !win.isOpen || win.isMinimized) {
    return null;
  }

  const isActive = activeWindowId === id;
  const isEffectiveMaximized = win.isMaximized || isMobile;
  const IconComponent = ICON_MAP[win.iconName] || Terminal;

  // Architectural Solution 1: Focus-Based Glassmorphism
  // Active window gets backdrop-blur-2xl for maximum fidelity.
  // Inactive background windows dynamically downgrade blur to backdrop-blur-sm with a subtle darkening overlay to eliminate GPU rasterization bottlenecks.
  const blurClass = isDragging
    ? "backdrop-blur-md"
    : isActive
    ? "backdrop-blur-2xl"
    : "backdrop-blur-sm";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 15 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      drag={!isEffectiveMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onPointerDown={() => focusWindow(id)}
      style={{
        zIndex: win.zIndex,
        position: "absolute",
        ...(isEffectiveMaximized
          ? {
              top: "44px",
              left: "12px",
              right: "12px",
              bottom: "76px",
              width: "calc(100vw - 24px)",
              height: "calc(100vh - 120px)",
              transform: "none",
            }
          : {
              left: win.defaultPosition.x,
              top: win.defaultPosition.y,
              width: Math.min(win.defaultSize.width, window.innerWidth - 32),
              height: Math.min(win.defaultSize.height, window.innerHeight - 130),
            }),
      }}
      className={`flex flex-col rounded-xl overflow-hidden transition-all duration-300 ${
        isActive
          ? `bg-white/85 dark:bg-zinc-950/90 ${blurClass} border border-cyan-500/40 dark:border-cyan-500/30 shadow-[0_10px_35px_rgba(6,182,212,0.15)] dark:shadow-[0_0_40px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30 dark:ring-cyan-500/20 text-slate-900 dark:text-zinc-100`
          : `bg-slate-900/35 dark:bg-black/50 ${blurClass} border border-slate-300/40 dark:border-zinc-800/80 shadow-lg text-slate-700 dark:text-zinc-300`
      }`}
    >
      {/* Window Titlebar (Drag Handle) */}
      <div
        onPointerDown={(e) => {
          focusWindow(id);
          if (!isEffectiveMaximized) {
            dragControls.start(e);
          }
        }}
        className={`h-10 px-4 flex items-center justify-between border-b select-none ${
          isEffectiveMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        } transition-colors ${
          isActive
            ? "bg-slate-100/90 dark:bg-zinc-900/90 border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-zinc-100"
            : "bg-slate-900/40 dark:bg-zinc-950/60 border-slate-700/30 dark:border-white/5 text-slate-400 dark:text-zinc-400"
        }`}
      >
        {/* macOS Traffic Lights */}
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(id);
            }}
            className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 border border-red-600/50 flex items-center justify-center group transition-colors"
            title="Close"
            aria-label="Close Window"
          >
            <X className="w-2 h-2 text-zinc-950 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(id);
            }}
            className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 border border-amber-600/50 flex items-center justify-center group transition-colors"
            title="Minimize"
            aria-label="Minimize Window"
          >
            <Minus className="w-2 h-2 text-zinc-950 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximizeWindow(id);
            }}
            className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 border border-emerald-600/50 flex items-center justify-center group transition-colors"
            title={isEffectiveMaximized ? "Restore" : "Maximize"}
            aria-label="Maximize Window"
          >
            {isEffectiveMaximized ? (
              <Minimize2 className="w-2 h-2 text-zinc-950 opacity-0 group-hover:opacity-100 transition-opacity" />
            ) : (
              <Maximize2 className="w-2 h-2 text-zinc-950 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
          </button>
        </div>

        {/* Window Title & Icon */}
        <div className="flex items-center gap-2 text-xs font-mono font-medium tracking-wide">
          <IconComponent className={`w-3.5 h-3.5 ${isActive ? "text-cyan-600 dark:text-cyan-400" : "text-slate-400 dark:text-zinc-400"}`} />
          <span>{win.title}</span>
        </div>

        {/* Action button right side indicator */}
        <div className="w-12 flex justify-end">
          <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" : "bg-slate-400 dark:bg-zinc-600"}`} />
        </div>
      </div>

      {/* Window Body Container wrapped with WindowFocusProvider */}
      <WindowFocusProvider isFocused={isActive}>
        <div className="flex-1 overflow-auto p-4 md:p-6 custom-scrollbar text-slate-800 dark:text-zinc-100 selection:bg-cyan-500/30 relative">
          {/* Subtle Darkening Overlay for Inactive Windows */}
          {!isActive && (
            <div className="absolute inset-0 bg-black/15 dark:bg-black/30 pointer-events-none z-10 transition-opacity duration-300" />
          )}
          {children}
        </div>
      </WindowFocusProvider>
    </motion.div>
  );
}
