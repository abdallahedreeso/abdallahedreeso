import React from "react";
import { motion, useDragControls } from "framer-motion";
import {
  useWindow,
  useActiveWindowId,
  usePortfolioActions,
  WindowId,
} from "@/store/use-portfolio-store";
import { useIsMobile } from "@/hooks/use-mobile";
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

export const OSWindowFrame = React.memo(function OSWindowFrame({ id, children }: WindowFrameProps) {
  const win = useWindow(id);
  const activeWindowId = useActiveWindowId();
  const { closeWindow, minimizeWindow, toggleMaximizeWindow, focusWindow } = usePortfolioActions();
  const dragControls = useDragControls();
  const isMobile = useIsMobile();
  const dragConstraints = React.useMemo(() => {
    if (typeof window === "undefined" || !win) return undefined;
    const startX = win.defaultPosition.x;
    const startY = win.defaultPosition.y;
    return {
      top: -startY + 44,
      left: -startX + 12,
      right: Math.max(0, window.innerWidth - startX - win.defaultSize.width - 12),
      bottom: Math.max(0, window.innerHeight - startY - 120),
    };
  }, [win]);

  if (!win || !win.isOpen) {
    return null;
  }

  const isActive = activeWindowId === id;
  const isEffectiveMaximized = win.isMaximized || isMobile;
  const IconComponent = ICON_MAP[win.iconName] || Terminal;

  const handleFocus = () => {
    if (activeWindowId !== id) {
      focusWindow(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.93, y: 15 }}
      animate={
        win.isMinimized
          ? { opacity: 0, scale: 0.75, y: 55, x: 0 }
          : isEffectiveMaximized
          ? { opacity: 1, scale: 1, x: 0, y: 0 }
          : { opacity: 1, scale: 1 }
      }
      exit={{ opacity: 0, scale: 0.9, y: 18 }}
      transition={{ type: "spring", stiffness: 380, damping: 28, mass: 0.8 }}
      drag={!isEffectiveMaximized && !win.isMinimized}
      dragControls={dragControls}
      dragConstraints={dragConstraints}
      dragElastic={0.05}
      dragListener={false}
      dragMomentum={false}
      onPointerDown={handleFocus}
      style={{
        zIndex: win.zIndex,
        position: "absolute",
        display: "flex",
        pointerEvents: win.isMinimized ? "none" : "auto",
        willChange: "transform, opacity",
        ...(isEffectiveMaximized
          ? {
              top: "44px",
              left: "12px",
              right: "12px",
              bottom: "48px",
              width: "calc(100vw - 24px)",
              height: "calc(100vh - 92px)",
              transform: "none",
            }
          : {
              left: win.defaultPosition.x,
              top: win.defaultPosition.y,
              width: win.defaultSize.width,
              height: win.defaultSize.height,
              maxWidth: "calc(100vw - 24px)",
              maxHeight: "calc(100vh - 92px)",
            }),
      }}
      className={`flex flex-col rounded-xl overflow-hidden backdrop-blur-xl transition-colors duration-300 ${
        isActive
          ? `bg-white/85 dark:bg-zinc-950/90 border border-cyan-500/40 dark:border-cyan-500/30 shadow-[0_10px_35px_rgba(6,182,212,0.15)] dark:shadow-[0_0_40px_rgba(6,182,212,0.15)] ring-1 ring-cyan-500/30 dark:ring-cyan-500/20 text-slate-900 dark:text-zinc-100`
          : `bg-white/70 dark:bg-zinc-950/80 border border-slate-200/80 dark:border-zinc-800 shadow-xl opacity-95 text-slate-800 dark:text-zinc-100`
      }`}
    >
      {/* Window Titlebar (Drag Handle) */}
      <div
        onPointerDown={(e) => {
          handleFocus();
          if (!isEffectiveMaximized) {
            dragControls.start(e);
          }
        }}
        className={`h-10 px-4 flex items-center justify-between border-b select-none ${
          isEffectiveMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        } transition-colors ${
          isActive
            ? "bg-slate-100/90 dark:bg-zinc-900/90 border-slate-200/80 dark:border-white/10 text-slate-900 dark:text-zinc-100"
            : "bg-slate-100/50 dark:bg-zinc-900/50 border-slate-200/50 dark:border-white/5 text-slate-500 dark:text-zinc-400"
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

      {/* Window Body Container */}
      <div className="flex-1 overflow-auto p-4 md:p-6 custom-scrollbar text-slate-800 dark:text-zinc-100 selection:bg-cyan-500/30 overscroll-contain">
        {children}
      </div>
    </motion.div>
  );
});
