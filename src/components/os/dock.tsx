import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useWindow,
  useActiveWindowId,
  useOpenWindowIds,
  usePortfolioActions,
  WindowId,
} from "@/store/use-portfolio-store";
import {
  Terminal,
  User,
  FolderGit2,
  Cpu,
  Mail,
  Download,
  ChevronUp,
  GripHorizontal,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DockItemConfig {
  id: WindowId;
  label: string;
  icon: React.ElementType;
  gradient: string;
}

const DOCK_ITEMS: DockItemConfig[] = [
  {
    id: "hero",
    label: "Terminal / Overview",
    icon: Terminal,
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    id: "about",
    label: "About Me",
    icon: User,
    gradient: "from-indigo-500 to-purple-400",
  },
  {
    id: "skills",
    label: "Technical Skills",
    icon: Cpu,
    gradient: "from-emerald-500 to-teal-400",
  },
  {
    id: "contact",
    label: "Get In Touch",
    icon: Mail,
    gradient: "from-purple-500 to-pink-500",
  },
];

const OSDockItem = React.memo(function OSDockItem({
  item,
  onToggle,
}: {
  item: DockItemConfig;
  onToggle: (id: WindowId) => void;
}) {
  const win = useWindow(item.id);
  const activeWindowId = useActiveWindowId();
  const isOpen = win?.isOpen;
  const isActive = activeWindowId === item.id && isOpen && !win?.isMinimized;
  const Icon = item.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => onToggle(item.id)}
          className="relative group flex flex-col items-center focus:outline-none"
          aria-label={item.label}
        >
          <motion.div
            whileHover={{ scale: 1.2, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`relative w-11 h-11 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "bg-white/90 dark:bg-white/15 border border-cyan-500/60 dark:border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
                : "bg-white/40 dark:bg-white/5 border border-slate-300/50 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10"
            }`}
          >
            {/* Glow backdrop on active */}
            {isActive && (
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-tr ${item.gradient} opacity-25 blur-sm`} />
            )}

            <Icon
              className={`w-5 h-5 md:w-6 md:h-6 transition-colors duration-200 ${
                isActive ? "text-cyan-600 dark:text-cyan-300" : "text-slate-600 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-white"
              }`}
            />
          </motion.div>

          {/* Active Status Indicator Dot */}
          <div className="h-1.5 flex items-center justify-center mt-1">
            {isOpen && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive
                    ? "bg-cyan-500 dark:bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                    : "bg-slate-400 dark:bg-zinc-500"
                }`}
              />
            )}
          </div>
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="top"
        sideOffset={12}
        className="bg-slate-900/90 dark:bg-zinc-900/90 backdrop-blur-md border border-slate-700 dark:border-white/15 text-slate-100 font-sans text-xs px-2.5 py-1 rounded-lg z-[60]"
      >
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
});

export const OSDock = React.memo(function OSDock() {
  const { toggleWindow } = usePortfolioActions();
  const activeWindowId = useActiveWindowId();
  const openWindowIds = useOpenWindowIds();
  const activeWindow = useWindow(activeWindowId ?? "hero");
  const isMobile = useIsMobile();

  const [isHovered, setIsHovered] = React.useState(false);
  const navRef = React.useRef<HTMLElement>(null);

  // Compact handle mode triggers ONLY on mobile screens when a window is open and active
  const hasActiveWindowOnScreen =
    openWindowIds.length > 0 &&
    activeWindowId !== null &&
    activeWindow?.isOpen &&
    !activeWindow?.isMinimized;

  const isCompactMode = isMobile && hasActiveWindowOnScreen && !isHovered;

  // Auto-collapse dock when clicking/tapping outside on touch / small screens
  React.useEffect(() => {
    if (!hasActiveWindowOnScreen || !isHovered) return;

    const handlePointerDownOutside = (event: MouseEvent | TouchEvent | PointerEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsHovered(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    document.addEventListener("touchstart", handlePointerDownOutside);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
      document.removeEventListener("touchstart", handlePointerDownOutside);
    };
  }, [hasActiveWindowOnScreen, isHovered]);

  const handleToggleWindow = (id: WindowId) => {
    toggleWindow(id);
    setIsHovered(false);
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/Abdallah_Edrees_Frontend_CV.pdf";
    link.download = "Abdallah_Edrees_Frontend_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <nav
        ref={navRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 select-none max-w-[95vw] transition-all duration-300"
      >
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 350, damping: 28 }}
          className={`relative flex items-center justify-center rounded-2xl bg-white/80 dark:bg-zinc-900/75 backdrop-blur-2xl border border-white/60 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.15)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.7)] transition-all duration-300 ${
            isCompactMode
              ? "px-4 py-2 cursor-pointer hover:border-cyan-500/50 dark:hover:border-cyan-400/40 hover:shadow-cyan-500/10"
              : "px-3 py-2.5"
          }`}
          onClick={() => {
            if (isCompactMode) setIsHovered(true);
          }}
        >
          <AnimatePresence mode="wait">
            {isCompactMode ? (
              <motion.div
                key="compact-handle"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2.5 text-xs font-mono text-slate-600 dark:text-zinc-300"
              >
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                  <span className="text-[11px] font-medium tracking-wide uppercase text-slate-700 dark:text-zinc-200">
                    DOCK
                  </span>
                </div>

                <div className="h-3 w-px bg-slate-300 dark:bg-zinc-700" />

                <div className="w-8 h-1 rounded-full bg-slate-400/60 dark:bg-zinc-600/80 group-hover:bg-cyan-400 transition-colors" />

                <ChevronUp className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-bounce" />
              </motion.div>
            ) : (
              <motion.div
                key="full-dock"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 md:gap-3"
              >
                {DOCK_ITEMS.map((item) => (
                  <OSDockItem key={item.id} item={item} onToggle={handleToggleWindow} />
                ))}

                <div className="h-8 w-px bg-slate-300/60 dark:bg-white/15 mx-1" />

                {/* Quick Resume Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleDownloadResume}
                      className="relative group flex flex-col items-center focus:outline-none"
                      aria-label="Download Resume"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 transition-colors"
                      >
                        <Download className="w-5 h-5 md:w-6 md:h-6" />
                      </motion.div>
                      <div className="h-1.5 mt-1" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={12}
                    className="bg-slate-900/90 dark:bg-zinc-900/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-sans text-xs px-2.5 py-1 rounded-lg z-[60]"
                  >
                    Resume PDF
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </nav>
    </TooltipProvider>
  );
});

