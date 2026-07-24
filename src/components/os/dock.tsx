import { motion } from "framer-motion";
import { usePortfolioStore, WindowId } from "@/store/use-portfolio-store";
import {
  Terminal,
  User,
  FolderGit2,
  Cpu,
  Mail,
  Download,
} from "lucide-react";
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
    id: "projects",
    label: "Selected Projects",
    icon: FolderGit2,
    gradient: "from-cyan-500 to-blue-500",
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

export function OSDock() {
  const { windows, activeWindowId, toggleWindow } = usePortfolioStore();

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Abdallah_Edrees_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 select-none max-w-[95vw]">
        <div className="flex items-center gap-2 md:gap-3 px-3 py-2.5 rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-2xl border border-white/60 dark:border-white/15 shadow-[0_15px_35px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_rgba(0,0,0,0.6)] transition-colors duration-300">
          {DOCK_ITEMS.map((item) => {
            const win = windows[item.id];
            const isOpen = win?.isOpen;
            const isActive = activeWindowId === item.id && isOpen && !win?.isMinimized;
            const Icon = item.icon;

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => toggleWindow(item.id)}
                    className="relative group flex flex-col items-center focus:outline-none"
                    aria-label={item.label}
                  >
                    <motion.div
                      whileHover={{ scale: 1.25, y: -6 }}
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
                          layoutId={`dock-dot-${item.id}`}
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
                  className="bg-slate-900/90 dark:bg-zinc-900/90 backdrop-blur-md border border-slate-700 dark:border-white/15 text-slate-100 font-sans text-xs px-2.5 py-1 rounded-lg"
                >
                  {item.label}
                </TooltipContent>
              </Tooltip>
            );
          })}

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
                  whileHover={{ scale: 1.25, y: -6 }}
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
              className="bg-slate-900/90 dark:bg-zinc-900/90 backdrop-blur-md border border-cyan-500/40 text-cyan-300 font-sans text-xs px-2.5 py-1 rounded-lg"
            >
              Resume PDF
            </TooltipContent>
          </Tooltip>
        </div>
      </nav>
    </TooltipProvider>
  );
}
